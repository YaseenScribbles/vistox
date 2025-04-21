<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Your New Password</title>
        <style>
            body {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                background-color: #f7f7f7;
                padding: 20px;
                color: #333;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 8px;
                max-width: 600px;
                margin: auto;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #888;
                text-align: center;
            }
            .button {
                background-color: #4f46e5;
                color: white;
                padding: 10px 18px;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hello {{ $user->name }},</h2>

            <p>
                Your new password has been set. Please use the credentials below
                to log in:
            </p>

            <p><strong>Email:</strong> {{ $user->email }}</p>
            <p><strong>New Password:</strong> {{ $password }}</p>

            <p>Thank you.</p>

            <div class="footer">
                This email was sent automatically. Please do not reply directly.
            </div>
        </div>
    </body>
</html>
