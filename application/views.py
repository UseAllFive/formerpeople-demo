#-- URL Handlers
from functools import wraps
from flask import render_template
from flask import request
from flask import Response
import logging

def main(path):
    return render_template('homepage.html')

def warmup():
    """App Engine warmup handler
    See http://code.google.com/appengine/docs/python/config/appconfig.html#Warming_Requests

    """
    return ''

