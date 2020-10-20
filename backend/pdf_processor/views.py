from googletrans import Translator
from rest_framework.decorators import api_view
from rest_framework.response import Response


translator = Translator()


@api_view(['POST'])
def pdf_processor(request):
    translation = translator.translate(text=request.data['word'], dest=request.data['lang']).text
    response = {'word': translation, 'name': request.data['name']}
    return Response({"data": response})

