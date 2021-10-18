import environ

from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from djoser.conf import settings
from templated_mail.mail import BaseEmailMessage

env = environ.Env()

class ActivationEmail(BaseEmailMessage):
    """ Overridden djoser activation email class to use custom domain
    """
    template_name = "email/activation.html"

    def get_context_data(self):
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        context["domain"] = env.str('DOMAIN')
        context["protocol"] = "http"
        return context


class PasswordResetEmail(BaseEmailMessage):
    """ Overridden djoser password reset email class to use custom domain
    """
    template_name = "email/password_reset.html"

    def get_context_data(self):
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.PASSWORD_RESET_CONFIRM_URL.format(**context)
        context["domain"] = env.str('DOMAIN')
        context["protocol"] = "http"
        return context