from werkzeug.security import generate_password_hash, check_password_hash
import base64

def encriptado(text):
    texto_original=text.encode()
    text_encriptado=base64.b64encode(texto_original)
    texto_notBit=text_encriptado.decode()
    return texto_notBit

def desencriptado(text):
    text_encriptado=text.encode()
    texto_desencriptado_bytes=base64.b64decode(text_encriptado)
    texto_desencriptado=texto_desencriptado_bytes.decode()
    return texto_desencriptado

def encriptado_constraseña(text):
    texto_encriptado=generate_password_hash(text, 'pbkdf2:sha256', 30)
    return texto_encriptado

def desencriptado_contraseña(texto_encriptado, contraseña):
    respuesta=check_password_hash(texto_encriptado, contraseña)
    return(respuesta)


def indiceInicial(indice):
    if indice==1:
        inicial=0
    elif indice>1:
        inicial=50*(indice-1)
    return inicial

def indiceFinal(indice):
    if indice==1:
        ultimo=50
    elif indice>1:
        ultimo=50*indice
    return ultimo

