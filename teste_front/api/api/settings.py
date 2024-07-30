import os
import datetime

import health_check  # pylint: disable=unused-import

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#
AUTH_USER_MODEL = 'pessoa.Pessoa'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'o=^ugslkltb$j*sz&)*magg$n%+j9w1nj0)qy2%(ibn=wo=b09'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost",'localhost:3000','http://localhost:3000']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django_admin_json_editor',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
    'pessoa.apps.PessoaConfig',
    'utils.apps.UtilsConfig',
    'projeto.apps.ProjetoConfig'
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django_user_agents.middleware.UserAgentMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django_currentuser.middleware.ThreadLocalUserMiddleware",
    "simple_history.middleware.HistoryRequestMiddleware",
]
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
        'utils.permissions.GroupPermission',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'pessoa.jwt_authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'EXCEPTION_HANDLER': 'utils.exceptions.drf_exception_handler',
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'

DEFAULT_AUTO_FIELD='django.db.models.AutoField'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# db = os.getenv('DB_TYPE')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DATABASE_NAME'),
        'HOST': os.getenv('DATABASE_HOST'),
        'PORT': os.getenv('DATABASE_PORT', '1433'),
        'USER': os.getenv('DATABASE_USER'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD'),
        'OPTIONS': {
            'sslmode': 'require',
            # 'options': '-c timezone=UTC',
        },
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

MASTER_PASSWORD = os.getenv('MASTER_PASSWORD')

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'pt-br'

USE_I18N = True

USE_L10N = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static")

CORS_ORIGIN_WHITELIST = '__ALL__'


API_HOST = os.getenv("API_HOST", "http://localhost:8000") 

CORS_ORIGIN_ALLOW_ALL = True

CORS_EXPOSE_HEADERS = ['Content-Disposition']

JWT_AUTH = {
    'JWT_ENCODE_HANDLER': 'rest_framework_jwt.utils.jwt_encode_handler',
    'JWT_PAYLOAD_HANDLER': 'utils.jwt.custom_jwt_payload_handler',
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'utils.jwt.custom_jwt_response_payload_handler',
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
    'JWT_ALLOW_REFRESH': True,
}
STORAGE = {
    'SERVICE': os.getenv('STORAGE_SERVICE'),
    'BLOB': {
        'STORAGE_ACCOUNT_NAME': os.getenv('STORAGE_ACCOUNT_NAME'),
        'STORAGE_ACCOUNT_KEY': os.getenv('STORAGE_ACCOUNT_KEY'),
        'STORAGE_CONTAINER_NAME': os.getenv('STORAGE_CONTAINER_NAME'),
    },
    'S3': {'BUCKET_NAME': os.getenv('STORAGE_BUCKET_NAME')},
    'CANDIDATES_RECORDING_BUCKET': os.getenv('CANDIDATES_RECORDING_BUCKET'),
    'BATIMENTO_BUCKET': os.getenv('BATIMENTO_BUCKET'),
    'FILE_UPLOAD_MAX_MEMORY_SIZE': os.getenv('FILE_UPLOAD_MAX_MEMORY_SIZE'),
}
