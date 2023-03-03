# Setup firebase

[Add Firebase to a server from google's documentation](https://firebase.google.com/docs/admin/setup)

## Get cert

### Step 1: Add firebase project

![Add Firebase Project](./images/add-firebase-project.png)

### Step 2: Get cert

![Add Firebase Project](./images/get-firebase-cert.png)

## Step 3: Copy cert to code below

```javascript
initializeApp({
  credential: cert({
    type: '...',
    project_id: '...',
    private_key_id: '...',
    private_key: '...',
    client_email: '...',
    client_id: '...',
    auth_uri: '...',
    token_uri: '...',
    auth_provider_x509_cert_url: '...',
    client_x509_cert_url: '...',
  }),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
});
```

# Example

```javascript
initializeApp({
  credential: cert({
    // @ts-ignore
    type: 'service_account',
    project_id: 'innate-path-352909',
    private_key_id: '68734e48ed8338cafafde14bb5ca5e777124c875',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDzqlH9ysGITaj+\n+QX1klx+eBRYyTENAXPjNtJqPuGWyaN8oTYl24HiKLumxzZ2OQ3TYWJ9C0y0HF4y\ngrF0+DHhiDSDDo7Gktt/tNmtKT7U9YzYP3ajxmN8mgouYpIPNSHwuA/yKqyPDbRK\nARZPkztiH54BkXqfHeVm661mFjhutET/MqmWm3nVPlUYDv5Kg32vXPR7RoxlDjF7\nrwJdEKjal1NBeZYmTIqfDZxeyvSiDqXCS5BDhWXnMtpPNhKNuQHJKKT8p9bWntoa\nw7iqOyBCUx1ngy0JJFkwG06GbafrP0fysEqrtx6y0Au0Jttqa5MwwTKLAr2BmZpa\nKmXC1AyzAgMBAAECggEAKFj3orLEQTG63h2WIwfNURPJKrqF6MVozyLwzK8E49cX\nvzdio/opE63zBLbQCduAspPZnyMT3G8mGe8SO3Atsk6/g0QR2EfRGOB1evrtcI4I\neHZpysy7BJLtRKkFzobZy+ZunYb7c+StCeQMMbkLiD/8Bf5084wbxGMaH2Fmjs3w\nOCrj2e+SN9yqq9iPXR5IZeO5zqXPj5+G99B3ZRVN7zIwNNiY8fbli+eXI7XUciLa\nRKw1ZBJC+/idSJJcGeLAj6+Vf5E4zYFTv6u9je8zi8sO81PLwC4WusJ7B89bAKRR\nEmxX+M692fIML37cCHUCpXI0XCr5IiBBmw6yfDg54QKBgQD6RI+hFutfQUV/ETyJ\nr1xvvxNlvx3CVYoqGrX4Bz76cgpR/BinzDQhJw3TkYF5BVM+MwxS7Q9f7GGnzV+7\nOSLPyu2XUBjt+WZfFBzUxqYyDM1BOAM/MU1Bp5Cz0FJQzQ64QHVtBz1y2htYoZ65\ncRfNqwT8GOqKPlu3wY5Hqj3ZtQKBgQD5PwuttFrMXdXc5yKWEH+HYGJ500liy+F6\nm8XSP6C7Osh3VrjVMQ1iIwxDNDYioY+cmfIZMOnrmbrN5BMwEhbwizOqVR3DPozn\nVAog5pVeDMrF3DWAGjoB56DUyIuQHJoEEoniJQZMzy2GZ0o+TFcAQEQMloiNiisE\n9aRiiG8txwKBgH5fgntgfGf0KKiaRoxr7WxL+vqEv/0yfnr2U+6zkfya+1UczEJm\n3efjtZqgvdUjeD5PPqjdJcdVMJawIOgEWOy+VqzyeDQqnKPkHw7eZGufhUGqjBEr\nzwwZFfuGdRpyAT3O5rywTDojom1l5yVS0yc6dWDrH/vAs0Wdyj+r2mGFAoGBANsp\n18APFcQcQsBysVPY//pvA0hyRFZORl9EeAcvEctwnfNp2y8DaexAOzkgwPVksN4X\n8+y4uQgE7mC6yzB6x5cOIAkHvRsAdm+20w0pFHBVuTuQLa8N4LHqFd7k1OuMatVn\n47xpqAeEKVjEnGD5SYsb93pGJ56lvrwmrzxBEdnjAoGAIUWysPkaVNWZJE7G4NdO\nItY2ZvV4mbaWRhq3wcYSwiY1HQVogJSyCnFeyu0Cu+3Lkgz95jHA7TWM6t+M9wY9\nQ0cfDzrNV+0HRreSRTR/v0a0FpS5BUa0KA4I514UH6/CnPKeg61IXgzFrJzmgkkj\n3VNUp4TzlZXOCgBwhTeqMM8=\n-----END PRIVATE KEY-----\n',
    client_email: 'tuong-758@innate-path-352909.iam.gserviceaccount.com',
    client_id: '116996550592785558076',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/tuong-758%40innate-path-352909.iam.gserviceaccount.com',
  }),
  databaseURL: 'https://innate-path-352909.firebaseio.com',
});
```
