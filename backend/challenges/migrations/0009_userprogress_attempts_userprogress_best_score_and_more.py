# Generated by Django 4.2.19 on 2025-02-19 05:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("challenges", "0008_submission_test_results"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprogress",
            name="attempts",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="userprogress",
            name="best_score",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="userprogress",
            name="status",
            field=models.CharField(
                choices=[
                    ("not_started", "Not Started"),
                    ("in_progress", "In Progress"),
                    ("completed", "Completed"),
                ],
                default="not_started",
                max_length=20,
            ),
        ),
    ]
