# CHANGELOG

The file contains important changes from version to version.

## 2021.10 - RELEASED

### Features

* Created FE for categories and products
* Added 'orders' app
* Products filter (both admin and user)
* Products search (both admin and user)
* Sending emails asynchronously using Django-Celery-Email
* Signin / Login
* djoser for authentication, user email activation, password reset - use celery
* ViewSets categories, products
* Admin actions for authentication, categories, products
* Docstrings
* drf-yasg for swagger doc
* Tests
* Added C4 Model for the project
* Created FE for:
  * Cart;
  * Login/SignUp/UserActivation/PasswordReset; 
  * Search; 
  * ProfileUpdate;
  * Wishlist;
  * Preloader;
  * Filter;
* Connected Stripe for payments
* Connected django-redis-cache for highload endpoints
* django-cachalot for caching ORM queries
* Configured AWS for the project: EC2 instance for API, RDS, S3 for hosting the frontend and static files.

### Fixes/Improvements

* Separated apps for categories, products
* Upload multiple images for product
* Dynamic slug
* Using decorator for registering models in admin
* Moved routers from main urls.py to respective apps
* Only 'list' and 'retrieve' for categories and products
* Show specific fields for 'list'
* Using nested relationships for Product and ProductImage serializer
* Updated dev packages
* Added additional fields to models
* Added read_only_fields to serializers
* Changed endpoints structure
* Grabbed the code from drf-action-serializer for more control
* Added more tests - coverage =95 %
* Added 'buyer' and 'product' serializers to OrderSerializer
* Improved README.md
* Changed main urls structure a bit
* Fixed styles in frontend
