from django.db import models
from django.utils.text import slugify


class Category(models.Model):

	name = models.CharField(max_length=255, verbose_name='Category name')
	slug = models.SlugField(unique=True, blank=True, null=True)
	is_active = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)
	last_updated = models.DateTimeField(auto_now_add=True)

	class Meta:
		db_table = 'categories_categories'
		verbose_name = 'Category'
		verbose_name_plural = 'Categories'
		app_label = 'categories'
		ordering = ['-created_at']

	def __str__(self):
		return self.name

	def save(self, *args, **kwargs):
		super().save(*args, **kwargs)
		if not self.slug:
			self.slug = slugify(self.name)
			self.save()
