<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $fromDate = $request->query('from_date');
        $toDate = $request->query('to_date');
        if (!$fromDate && !$toDate) {
            $fromDate = Carbon::now()->toDateString();
            $toDate = Carbon::now()->toDateString();
        }

        // dd([$fromDate, $toDate]);

        $ordersSql = DB::table('orders as o')
            ->select(
                'o.id',
                'c.contact_person',
                'c.district',
                'c.state',
                'o.created_at',
                'o.total_qty',
                DB::raw("COUNT(DISTINCT oi.brand || '-' || oi.style) as count")
            )
            ->join('order_items as oi', 'o.id', '=', 'oi.order_id')
            ->join('contacts as c', 'c.id', '=', 'o.contact_id')
            ->where('o.created_at', '>=', Carbon::parse($fromDate)->startOfDay())
            ->where('o.created_at', '<=', Carbon::parse($toDate)->endOfDay())
            ->groupBy(
                'o.id',
                'c.contact_person',
                'c.district',
                'c.state',
                'o.created_at',
                'o.total_qty'
            )
            ->orderByDesc('o.id');
        return inertia('Orders/OrderList', [
            'orders' => fn() => $ordersSql->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $contacts = Contact::all();
        $nextId = Order::max('id');
        $nextId = $nextId ? $nextId + 1 : 1;
        return inertia('Orders/AddOrder', compact('contacts', 'nextId'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'remarks' => 'nullable|string',
            'total_qty' => 'required|integer',
            'user_id' => 'required|exists:users,id',
            'order_items' => 'required|array',
            'order_items.*.size_id' => 'required|integer',
            'order_items.*.qty' => 'required|integer'
        ], [
            'contact_id.required' => 'Please select a contact',
            'order_items.required' => 'Please add items',
        ]);

        $orderData = $request->except('order_items');
        $orderDetails = $request->order_items;

        try {
            //code...
            DB::beginTransaction();
            $order = Order::create($orderData);

            foreach ($orderDetails as $key => $value) {
                # code...
                OrderItem::create([
                    'order_id' => $order->id,
                    'size_id' => $value['size_id'],
                    'qty' => $value['qty'],
                    's_no' => $key + 1,
                    'brand' => $value['brand'],
                    'style' => $value['style'],
                    'size' => $value['size'],
                ]);
            }

            DB::commit();

            return back()->with('message', $order->id);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->with('message', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load('order_items');
        $contact = Contact::find($order->contact_id);
        return inertia('Orders/OrderDetails', compact('order', 'contact'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $order->load('order_items');
        $contact = Contact::find($order->contact_id);
        $contacts = Contact::all();
        return inertia('Orders/EditOrder', compact('order', 'contact', 'contacts'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'remarks' => 'nullable|string',
            'total_qty' => 'required|integer',
            'user_id' => 'required|exists:users,id',
            'order_items' => 'required|array',
            'order_items.*.size_id' => 'required|integer',
            'order_items.*.qty' => 'required|integer'
        ]);

        $orderData = $request->except('order_items');
        $orderDetails = $request->order_items;

        try {
            //code...
            DB::beginTransaction();
            $order->update($orderData);

            OrderItem::where('order_id', $order->id)->delete();

            foreach ($orderDetails as $key => $value) {
                # code...
                OrderItem::create([
                    'order_id' => $order->id,
                    'size_id' => $value['size_id'],
                    'qty' => $value['qty'],
                    's_no' => $key + 1,
                    'brand' => $value['brand'],
                    'style' => $value['style'],
                    'size' => $value['size'],
                ]);
            }

            DB::commit();
            return back()->with('message', $order->id);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->with('message', $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        try {
            //code...
            DB::beginTransaction();
            OrderItem::where('order_id', $order->id)->delete();
            $order->delete();
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->with('message', $th->getMessage());
        }
        return redirect()->route('orders.index');
    }
}
