from django.shortcuts import render
from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from .models import Personal, Cargos, Personas, Codigo_Area, Paciente, Tipo_Examen, Examen, Tipo_Muestra, Muestras, Tipo_Examen_X_Tipo_Muestra, Tipo_Examen_X_Cargo, Valores_Predeterminados, Archivo, Tipo_Examen_X_Valores_Predeterminados
from django.db import IntegrityError, connection
import json
from django.core.serializers import serialize
from .encry import desencriptado, encriptado, encriptado_constraseña, desencriptado_contraseña, indiceFinal, indiceInicial
from datetime import datetime 
from django.utils import timezone




# CLASE ENCARGADA DEL REGISTRO DE LOS CARGOS Y DE SU BUSQUEDAD DE TODOS :)
class Cargos_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # Funcion para el registro de los cargos
    def post(self, request):
        try:
            jd = json.loads(request.body)
            Cargos.objects.create(nombre=jd['nombre'].title())
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Compruebe Datos y asegurese de que no sean repetidos"}
            return JsonResponse(datos)
        
    def get(self, request):
        try:
            cursor=connection.cursor()
            query="SELECT * FROM cargos ORDER BY id ASC;"
            cursor.execute(query)
            cargos = dictfetchall(cursor)
            if len(cargos) > 0:
                datos = {'message': "Exito", 'Cargos': cargos}
            else:
                datos = {'message': "Cargos no Encontrado", 'Cargos': None}
            return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
             
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
    
class Personas_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # Funcion para el registro de los Personas
    def post(self, request):
        try:
            jd = json.loads(request.body)
            Personas.objects.create(nombres=jd['nombres'].title(), apellidos=jd['apellidos'].title(), sexo=jd['sexo'].title())
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except IntegrityError:
            datos = {'message': "Error. Verifique los datos"}
            return JsonResponse(datos)

    def get(self, request):
        personas=list(Personas.objects.values())
        if len(personas) > 0:
            datos = {'message': "Exito", 'Personas': personas}
        else:
            datos = {'message': "Personas no Encontrado"}
        return JsonResponse(datos)
# --------------------------------------------------------------------------------------------------------------------------------------------------------
        
class Personal_viws(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        personal=list(Personal.objects.values("id","usuario", "cargo"))
        if len(personal) > 0:
            datos = {'message': "Exito", 'Cargos': personal}
        else:
            datos = {'message': "Personal no Encontrado"}
        return JsonResponse(datos)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            password=encriptado_constraseña(jd["contraseña"])
            cargo= Cargos.objects.get(id=jd["cargo"])
            persona= Personas.objects.get(id=jd["persona"])
            Personal.objects.create(usuario=jd["usuario"], contraseña=password, credencial=jd["credencial"], cargo=cargo, persona=persona )
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except :
            datos = {'message': "Error. Verifique los datos"}
            return JsonResponse(datos)
# --------------------------------------------------------------------------------------------------------------------------------------------------------
    
class Codigo_area_viws(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # Funcion para el registro de los cargos
    def post(self, request):
        try:
            jd = json.loads(request.body)
            Codigo_Area.objects.create(codigo_area=jd['codigo_area'])
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Verifique los datos"}
            return JsonResponse(datos)
    
    def get(self, request):
        codigo_area=list(Codigo_Area.objects.values())
        if len(codigo_area) > 0:
            for codigo in codigo_area:
                codigo['codigo_area']=f"0{codigo['codigo_area']}"
            datos = {'message': "Exito", 'codigo_area': codigo_area}
        else:
            datos = {'message': "Codigo area no Encontrado"}
        return JsonResponse(datos)
# --------------------------------------------------------------------------------------------------------------------------------------------------------
# CLASE ENCARGADA DEL REGISTRO DE LOS PACIENTES Y DE SU BUSQUEDAD USANDO COMO CONDICION LA CEDULA :)
class Pacientes_viws(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            persona = Personas.objects.get(id=jd["persona"])
            codigo = Codigo_Area.objects.get(id=jd["codigo_area"])
            Paciente.objects.create(cedula=jd["cedula"], telefono=jd["telefono"], codigo_telefonico=codigo, direccion=jd["direccion"], correo_electronico=jd["correo_electronico"], fecha_nacimiento=jd["fecha_nacimiento"] , persona=persona )
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Verifique los datos"}
            return JsonResponse(datos)

    def get(self, request, cedula=0):
        try:
            cursor=connection.cursor()
            if (cedula > 0):
                query=f"SELECT pc.id AS id_paciente, pc.cedula, pc.direccion, pc.correo_electronico, pc.fecha_nacimiento, ps.nombres, ps.apellidos, ps.sexo, CONCAT('0',co.codigo_area, pc.telefono) as telefono FROM paciente pc LEFT JOIN personas ps ON pc.persona = ps.id LEFT JOIN codigo_area co ON pc.codigo_telefonico = co.id WHERE pc.cedula={cedula};"
                cursor.execute(query)
                paciente = dictfetchall(cursor)
                if len(paciente) > 0:
                    datos = {'message': "Exito", 'paciente': paciente[0]}
                else:
                    datos = {'message': "Pacientes no encontrados", 'paciente':None}
                return JsonResponse(datos)
            else:
                query=f"SELECT pc.id AS id_paciente, pc.cedula, pc.direccion, pc.correo_electronico, pc.fecha_nacimiento, ps.nombres, ps.apellidos, ps.sexo, CONCAT('0',co.codigo_area, pc.telefono) as telefono FROM paciente pc LEFT JOIN personas ps ON pc.persona = ps.id LEFT JOIN codigo_area co ON pc.codigo_telefonico = co.id;"
                cursor.execute(query)
                pacientes = dictfetchall(cursor)
                print()
                if len(pacientes) > 0:
                    datos = {'message': "Exito", 'paciente': pacientes}
                else:
                    datos = {'message': "Pacientes no encontrados", 'paciente':None}
                return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
             
# --------------------------------------------------------------------------------------------------------------------------------------------------------
# CLASE ENCARGADA DEL REGISTRO DE LOS TIPOS DE EXAMEN Y DE SU BUSQUEDAD USANDO COMO CONDICION LA ID O DE LO CONTRARIO DEVUELVE TODOS LOS TIPOS DE EXAMENES :)
class Tipo_Examen_viws(View):
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            Tipo_Examen.objects.create(nombre=jd["nombre"].title(), description=jd["description"], muestra=jd["muestra"] )
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Compruebe Datos y asegurese de que no sean repetidos"}
            return JsonResponse(datos)
        
    def get(self, request, id=0):
        try:
            cursor=connection.cursor()
            if(id>0):
                query=f"SELECT * FROM  tipo_examen WHERE id={id};"
                cursor.execute(query)
                tipo_examen = dictfetchall(cursor)
                if len(tipo_examen) > 0:
                    tipo_examen = tipo_examen[0]
                    datos = {'message': "Exito", 'tipo_examen': tipo_examen}
                else:
                    datos = {'message': "Tipo de Examen no Encontrado", 'tipo_examen':None}
                return JsonResponse(datos)

            else:
                query="SELECT * FROM  tipo_examen;"
                cursor.execute(query)
                tipos_examen = dictfetchall(cursor)
                if len(tipos_examen) > 0:
                    datos = {'message': "Exito", 'tipo_examen': tipos_examen}
                else:
                    datos = {'message': "Tipos de Examen no Encontrados", 'tipo_examen':None}
                return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
                    
# --------------------------------------------------------------------------------------------------------------------------------------------------------
# CLASE ENCARGADA de LA BUSQUEDAD DE LOS TIPOS DE EXAMENES QUE TIENE ACCESO UN DETERMINADO CARGO :)
class Tipo_Examen_Cargo(View):
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, cargo=0):
        try:
            cursor=connection.cursor()
            if (cargo > 0):
                query=f"SELECT te.id, te.nombre, te.muestra FROM  tipo_examen_has_cargo ce LEFT JOIN tipo_examen te ON  ce.examen=te.id WHERE ce.cargo={cargo};"
                cursor.execute(query)
                tipo_examen = dictfetchall(cursor)
                if len(tipo_examen) > 0:
                    datos = {'message': "Exito", 'tipo_examen': tipo_examen}
                else:
                    datos = {'message': "Tipo de Examen no Encontrado", 'tipo_examen':None}
                return JsonResponse(datos)
            else:
                datos = {'message': "Tipos de Examen no Encontrados", 'tipo_examen':None}
            return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
              
# --------------------------------------------------------------------------------------------------------------------------------------------------------
# CLASE ENCARGADA DE REGISTRAR Y BUSCAR LOS EXAMENES POR UNA SERIE DE PARAMETROS GET Y POST :)
class Examen_viws(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            # SE BUSCAN TODOS LOS DATOS Y SE REGISTRA AL USUARIO
            paciente=Paciente.objects.get(id=jd["idPaciente"], cedula=jd["cedula"])
            id_personal=jd["idPersonal"]
            tipo_examen=Tipo_Examen.objects.get(id=jd["idExamen"], nombre=jd["nombre"])
            personal=Personal.objects.get(id=id_personal)
            Examen.objects.create(paciente=paciente, tipo=tipo_examen, estado=False, personal_registro=personal )
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Compruebe"}
            return JsonResponse(datos)
    
    def put (self, request, identificador):
        try:
            jd = json.loads(request.body)
            examen=list(Examen.objects.filter(id=identificador).values("tipo"))
            if(len(examen)>0):
                id_personal=jd["personal"]
                comprobacion=list(Tipo_Examen_X_Cargo.objects.filter(examen=examen[0]["tipo"], cargo=jd["cargo"]).values())
                if (len(comprobacion))>0:
                    examen=Examen.objects.get(id=identificador)
                    medico=Personal.objects.get(id=id_personal)
                    examen.estado=True
                    examen.observaciones=jd["observaciones"]
                    examen.fecha_finalizacion=timezone.now()
                    examen.personal_finalizacion=medico
                    examen.save()
                    datos = {'message': "Cambios efectuados"}
                else:
                    datos = {'message': "Usted no esta autorizado"}
            else:
                datos = {'message': "Examen inexistente"}
            return JsonResponse(datos)
        except Exception as ex:
            print(ex)
            datos = {'message': "Error"}
            return JsonResponse(datos)
    
    def delete(self, request, identificador):
        examen = list(Examen.objects.filter(id=identificador).values())
        if len(examen) > 0:
            Examen.objects.filter(id=identificador).delete()
            datos = {'message': "Eliminado"}
        else:
            datos = {'message': "Examen no encontrado"}
        return JsonResponse(datos)

    def get(self, request, identificador=0):
        try:
            cursor1=connection.cursor()
            cursor2=connection.cursor()
            # obtener todos los tados que tiene que venir la url
            indice=int(request.GET['indice'])
            if(indice<=0):
                indice=1

            estado=request.GET['estado']
            if(estado=="null"):
                estado=None
            elif(estado=="false"):
                estado=False
            elif(estado=="true"):
                estado=True
            else:
                estado=None
                
            idCategoria= int(request.GET['idCategoria'])
            if(idCategoria<0):
                idCategoria=0

            fecha_fin=request.GET['fecha_final']
            if(fecha_fin=="null"):
                fecha_fin=datetime.now()
            else:
                fecha_fin=datetime.strptime(fecha_fin, '%Y-%m-%d')
            fecha_inicio=request.GET['fecha_inicial']
            if(fecha_inicio=="null"):
                fecha_inicio="2023-01-01"
            else:
                fecha_inicio=datetime.strptime(fecha_inicio, '%Y-%m-%d')

            # indice de consulta
            inicio=indiceInicial(indice)
            final=indiceFinal(indice)

            # se verifica que tipo de consulta se necesita

            # busquedad por paciente
            if(idCategoria>0 and estado==None and identificador>0):
                print("caso 1")
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.tipo={idCategoria} AND pc.cedula={identificador} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.tipo={idCategoria} AND pc.cedula={identificador};"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(idCategoria>0 and (estado==True or estado==False) and identificador>0):
                print("caso 2")
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado} AND ex.tipo={idCategoria} AND pc.cedula={identificador} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado} AND ex.tipo={idCategoria} AND pc.cedula={identificador};"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(idCategoria<=0 and estado==None and identificador>0):
                print("caso 4")
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND pc.cedula={identificador} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND pc.cedula={identificador} ;"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(idCategoria<=0 and (estado==True or estado==False) and identificador>0):
                print("caso 5")
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado} AND pc.cedula={identificador} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado} AND pc.cedula={identificador};"
                cursor1.execute(query)
                cursor2.execute(cont)

            # busquedad por categoria
            if(idCategoria>0 and estado==None and identificador<=0):
                print("caso 7")
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.tipo={idCategoria} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.tipo={idCategoria};"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(idCategoria>0 and (estado==True or estado==False) and identificador<=0):
                print("caso 8")
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado} AND ex.tipo={idCategoria} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado} AND ex.tipo={idCategoria};"
                cursor1.execute(query)
                cursor2.execute(cont)
                
            # busquedad por estado
            if(idCategoria<=0 and estado==None and identificador<=0):
                print("caso 10")
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}';"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(idCategoria<=0 and (estado==True or estado==False) and identificador<=0):
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos  FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total  FROM examen ex WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado={estado};"
                cursor1.execute(query)
                cursor2.execute(cont)
                print("caso 11")

            examenes= dictfetchall(cursor1)
            total= dictfetchall(cursor2)

            # se envia la respuesta
            if len(examenes) > 0:
                datos = {'message': "Exito", 'Examenes':examenes, "Total":total[0]["total"]}
            else:
                datos = {'message': "Examenes no Encontrado", 'Examenes':None, "Total":0}
            return JsonResponse(datos)
        except ValueError:
            cursor1.close()
            cursor2.close()
            connection.close()
            datos = {'message': "Error, valor equivocado fecha en fomarto Año-Mes-Dia o indice o idCategoria en formato int", 'Examenes':None, "Total":0}
            return JsonResponse(datos)
        except Exception as ex:
            cursor1.close()
            cursor2.close()
            connection.close()
            datos = {'message': "Parametros equivocados por favor agregue su indice valor(int), estado valor (null o true o false), idCategoria valor(int), fecha_inicial(null o date), fecha_final(null o date)", 'Examenes':None, "Total":0}
            print(ex)
            return JsonResponse(datos)
        finally:
            cursor1.close()
            cursor2.close()
            connection.close()
             
# --------------------------------------------------------------------------------------------------------------------------------------------------------
# CLASE ENCARGADA DE  BUSCAR LOS EXAMENES INCPMPLETOS Y POR EL CARGO POR UNA SERIE DE PARAMETROS GET  :)
class Examen_Cargo(View):

    def get(self, request, idcargo=0, cedula=0):
        try:
            cursor1=connection.cursor()
            cursor2=connection.cursor()
            indice=int(request.GET['indice'])
            if(indice<=0):
                indice=1

            idCategoria= int(request.GET['idCategoria'])
            if(idCategoria<0):
                idCategoria=0

            fecha_fin=request.GET['fecha_final']
            if(fecha_fin=="null"):
                fecha_fin=datetime.now()
            else:
                fecha_fin=datetime.strptime(fecha_fin, '%Y-%m-%d')

            fecha_inicio=request.GET['fecha_inicial']
            if(fecha_inicio=="null"):
                fecha_inicio="2023-01-01"
            else:
                fecha_inicio=datetime.strptime(fecha_inicio, '%Y-%m-%d')

            inicio=indiceInicial(indice)
            final=indiceFinal(indice)
            
            # para buscar por paciente
            if(cedula>0 and idCategoria<=0):
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo} AND pc.cedula={cedula} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo} AND pc.cedula={cedula};"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(cedula<=0 and idCategoria<=0):
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total FROM examen ex LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo};"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(cedula>0 and idCategoria>0):
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo} AND pc.cedula={cedula} AND ex.tipo={idCategoria} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo} AND pc.cedula={cedula} AND ex.tipo={idCategoria};"
                cursor1.execute(query)
                cursor2.execute(cont)
            elif(cedula<=0 and idCategoria>0):
                query=f"SELECT ex.id, ti.nombre, ex.fecha_registro, ex.estado, pc.cedula, ps.nombres, ps.apellidos FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo} AND ex.tipo={idCategoria} ORDER BY ex.fecha_registro DESC LIMIT {inicio}, {final};"
                cont=f"SELECT COUNT(ex.id) AS total FROM examen ex LEFT JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id LEFT JOIN tipo_examen_has_cargo tc ON ti.id=tc.examen WHERE ex.fecha_registro>='{fecha_inicio}' AND ex.fecha_registro<='{fecha_fin}' AND ex.estado=False AND tc.cargo={idcargo} AND ex.tipo={idCategoria};"
                cursor1.execute(query)
                cursor2.execute(cont)

            examenes= dictfetchall(cursor1)
            total= dictfetchall(cursor2)
            # se envia la respuesta
            if len(examenes) > 0:
                datos = {'message': "Exito", 'Examenes':examenes, "Total":total[0]["total"]}
            else:
                datos = {'message': "Examenes no Encontrado", 'Examenes':None, "Total":0}
            return JsonResponse(datos)
        except ValueError:
            cursor1.close()
            cursor2.close()
            connection.close()
            datos = {'message': "Error, valor equivocado. Fecha en fomarto Año-Mes-Dia e indice en formato int", 'Examenes':None, "Total":0}
            return JsonResponse(datos)
        except Exception as ex:
            cursor1.close()
            cursor2.close()
            connection.close()
            datos = {'message': "Parametros equivocados por favor verifique este su indice valor(int), fecha_inicial(null o date), fecha_final(null o date), idCategoria valor(int). Ademas de tener valores aceptables", 'Examenes':None, "Total":0}
            print(ex)
            return JsonResponse(datos)
# --------------------------------------------------------------------------------------------------------------------------------------------------------
# CLASE ENCARGADA de LA BUSQUEDAD DE TODA LA INFORMACION DE UN EXAMEN GET :)
class Examen_Informacion(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        try:
            cursor1=connection.cursor()
            cursor2=connection.cursor()
            cursor3=connection.cursor()
            if(id>0):
                query1=f"SELECT ex.id AS id_examen, pc.id AS id_paciente, pc.cedula, ps.nombres, ps.apellidos, ps.sexo, pc.correo_electronico, pc.fecha_nacimiento,CONCAT('0',co.codigo_area, pc.telefono) AS telefono, pc.direccion, ex.fecha_registro AS fecha_registro_examen, ex.estado,CONCAT(ps2.nombres, ' ', ps2.apellidos) AS encargado, ti.id AS id_tipo_examen, ti.nombre, ti.muestra, ex.fecha_finalizacion, CONCAT(ps3.nombres, ' ', ps3.apellidos) AS medico  FROM examen ex INNER JOIN paciente pc ON ex.paciente=pc.id LEFT JOIN codigo_area co ON pc.codigo_telefonico = co.id INNER JOIN personas ps ON pc.persona=ps.id LEFT JOIN tipo_examen ti ON ex.tipo=ti.id INNER JOIN personal p1 ON ex.personal_registro=p1.id INNER JOIN personas ps2 ON p1.persona=ps2.id  LEFT JOIN personal p2 ON ex.personal_finalizacion=p2.id LEFT JOIN personas ps3 ON p2.persona=ps3.id  WHERE ex.id={id};"
                query2=f"SELECT mu.id, mu.fecha_registro, mu.fecha_extraccion, mu.numero, mu.lote, mu.interno, tm.id AS id_muestra, tm.nombre FROM muestras mu LEFT JOIN tipo_muestra tm ON mu.tipo_muestra=tm.id WHERE mu.examen={id};"
                query3=f"SELECT nombre, archivo, fecha_registro FROM archivo WHERE examen={id};"
                cursor1.execute(query1)
                cursor2.execute(query2)
                cursor3.execute(query3)
                examen = dictfetchall(cursor1)
                muestras=dictfetchall(cursor2)
                resultados=dictfetchall(cursor3)
                if len(examen)>0:
                    datos = {'message': "Exito", "Examen":examen[0], "Muestras":muestras, "Resultados":resultados}
                    return JsonResponse(datos)
                else:
                    datos = {'message': "Examen no existe", "Examen":None, "Muestras":None, "Resultados":None}
                    return JsonResponse(datos)
            else:
                datos = {'message': "Examen no existe", "Examen":None, "Muestras":None, "Resultados":None}
                return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor1.close()
            cursor2.close()
            cursor3.close()
            connection.close()
        finally:
            cursor1.close()
            cursor2.close()
            cursor3.close()
            connection.close()
            
# --------------------------------------------------------------------------------------------------------------------------------------------------------
# CLASE ENCARGADA DEL REGISTRO DE LOS TIPOS DE MUESTRA Y DE SU BUSQUEDAD POR LISTA O POR ID GET POST GET :)
class TipoMuestras_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    # Funcion para el registro de las muestras
    def post(self, request):
        try:
            jd = json.loads(request.body)
            Tipo_Muestra.objects.create(nombre=jd['nombre'].title())
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Compruebe Datos y asegurese de que no sean repetidos"}
            return JsonResponse(datos)
        

    def get(self, request, id=0):
        try:
            cursor=connection.cursor()
            if (id > 0):
                query=f"SELECT * FROM tipo_muestra ti WHERE ti.id={id};"
                cursor.execute(query)
                tipo_muestra = dictfetchall(cursor)
                if len(tipo_muestra) > 0:
                    tipo_muestra = tipo_muestra[0]
                    datos = {'message': "Exito", 'tipo_muestra': tipo_muestra}
                else:
                    datos = {'message': "Tipo de Muestra no Encontrado", 'tipo_muestra': None}
                return JsonResponse(datos)
            else:
                query="SELECT * FROM tipo_muestra ORDER BY id ASC;"
                cursor.execute(query)
                tipo_muestra=dictfetchall(cursor)
                if len(tipo_muestra) > 0:
                    datos = {'message': "Exito", 'tipo_muestra': tipo_muestra}
                else:
                    datos = {'message': "Tipo de Muestra no Encontrado", 'tipo_muestra': None}
                return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
             
# --------------------------------------------------------------------------------------------------------------------------------------------------------    
# CLASE PARA EL REGISTRO DE LAS MUESTRAS DE LOS EXAMENES Y SU BUSCADAD POST GET
class Muestra_view(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, ):
        try:
            cursor1=connection.cursor()
            cursor2=connection.cursor()
            query1="SELECT ex.id AS id_examen, ex.estado, ex.fecha_registro, te.id AS id_tipo_Examen, te.nombre AS nombre_Examen, pc.id AS id_paciente, pc.cedula, pc.direccion, pc.correo_electronico, pc.fecha_nacimiento, ps.nombres, ps.apellidos, ps.sexo, CONCAT('0',co.codigo_area, pc.telefono) as telefono FROM examen ex  LEFT JOIN tipo_examen te ON  ex.tipo=te.id  LEFT JOIN paciente pc ON  ex.paciente=pc.id LEFT JOIN personas ps ON  pc.persona=ps.id LEFT JOIN codigo_area co ON pc.codigo_telefonico = co.id WHERE ex.estado=0 and te.muestra=1 and NOT EXISTS(SELECT NULL FROM muestras mu WHERE mu.examen = ex.id);"
            query2="SELECT ex.id AS id_examen, ex.estado, ex.fecha_registro, te.id AS id_tipo_Examen, te.nombre AS nombre_Examen, pc.id AS id_paciente, pc.cedula, pc.direccion, pc.correo_electronico, pc.fecha_nacimiento, ps.nombres, ps.apellidos, ps.sexo, CONCAT('0',co.codigo_area, pc.telefono) as telefono  FROM examen ex  LEFT JOIN tipo_examen te ON  ex.tipo=te.id  LEFT JOIN paciente pc ON  ex.paciente=pc.id LEFT JOIN personas ps ON  pc.persona=ps.id LEFT JOIN codigo_area co ON pc.codigo_telefonico = co.id RIGHT JOIN muestras mu ON mu.examen=ex.id WHERE ex.estado=0 and te.muestra=1;"
            cursor1.execute(query1)
            cursor2.execute(query2)
            listaExamenSinMuestra = dictfetchall(cursor1)
            listaExamenConMuestra = dictfetchall(cursor2)
            datos = {'message': "Exito", 'examenesSinMuestras': listaExamenSinMuestra, 'examenesConMuestras':listaExamenConMuestra}
            return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor1.close()
            cursor2.close()
            connection.close()
        finally:
            cursor1.close()
            cursor2.close()
            connection.close()
             
    def post(self, request):
        try:
            jd = json.loads(request.body)
            examen=Examen.objects.get(id=jd["idExamen"])
            tipo_muestra=Tipo_Muestra.objects.get(id=jd["idMuestra"])
            comprobacion=list(Tipo_Examen_X_Tipo_Muestra.objects.filter(tipo_muestra=tipo_muestra, examen=examen.tipo))
            if(len(comprobacion)>0):
                id_personal=jd["idPersonal"]
                personal=Personal.objects.get(id=id_personal)
                Muestras.objects.create(tipo_muestra=tipo_muestra, examen=examen, fecha_extraccion=jd["fecha_extraccion"], numero=jd["numero"], lote=jd["lote"], interno=jd["interno"], personal=personal)
                datos = {'message': "Registro Completado"}
            else:
                datos = {'message': "Muestra No Permitida"}
            return JsonResponse(datos)  
        except:
            datos = {'message': "Error"}
            return JsonResponse(datos)    
# --------------------------------------------------------------------------------------------------------------------------------------------------------
          
class Valores_Predeterminados_views(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            Valores_Predeterminados.objects.create(nombre=jd["nombre"].upper(), valor_minimo=jd["valor_minimo"], valor_maximo=jd["valor_maximo"], unidad=jd["unidad"], decorador=jd["decorador"])
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)   
        except:
            datos = {'message': "Error durante el registro"}
            return JsonResponse(datos)

    def get(self, request):
        try:
            cursor=connection.cursor()
            query="SELECT * FROM valores_predeterminados ORDER BY id ASC;"
            cursor.execute(query)
            valores = dictfetchall(cursor)
            if len(valores) > 0:
                datos = {'message': "Exito", 'Valores': valores}
            else:
                datos = {'message': "Cargos no Encontrado", 'Valores': None}
            return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
                  
# --------------------------------------------------------------------------------------------------------------------------------------------------------

class Asignacion_Valores(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        try:
            jd = json.loads(request.body)
            tipo_Examen=Tipo_Examen.objects.get(id=jd["idExamen"])
            valor=Valores_Predeterminados.objects.get(id=jd["idValor"])
            Tipo_Examen_X_Valores_Predeterminados.objects.create(tipo_examen=tipo_Examen, valor_predeterminado=valor )
            datos = {'message': "Registro completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Compruebe Datos"}
            return JsonResponse(datos)

    def get(self,request, idExamen=0):
        try:
            cursor=connection.cursor()
            if(idExamen>0):
                query=f"SELECT v.id, v.nombre, v.valor_minimo, v.valor_maximo, v.unidad, v.decorador FROM examen ex INNER JOIN tipo_examen_has_valores_predeterminados txe ON txe.tipo_examen=ex.tipo INNER JOIN valores_predeterminados v ON v.id=txe.valor_predeterminado WHERE ex.id={idExamen};"
                cursor.execute(query)
                valores = dictfetchall(cursor)
                if len(valores) > 0:
                    datos = {'message': "Exito", 'Valores': valores}
                else:
                    datos = {'message': "Valores no encontrados", 'Valores': None}
            else:
                datos = {'message': "Valores no encontrados", 'Valores': None}
            return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
             
# --------------------------------------------------------------------------------------------------------------------------------------------------------
    
class Asignacion_Muestras(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        try:
            jd = json.loads(request.body)
            tipo_Examen=Tipo_Examen.objects.get(id=jd["idExamen"])
            tipo_Muestra=Tipo_Muestra.objects.get(id=jd["ideMuestra"])
            if(tipo_Examen.muestra):
                Tipo_Examen_X_Tipo_Muestra.objects.create(examen=tipo_Examen, tipo_muestra=tipo_Muestra )
                datos = {'message': "Registro Completado"}
            else:
                datos = {'message': "Examen no valido"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Compruebe Datos"}
            return JsonResponse(datos)
# --------------------------------------------------------------------------------------------------------------------------------------------------------
               
class Asignacion_Examen(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        try:
            jd = json.loads(request.body)
            tipo_Examen=Tipo_Examen.objects.get(id=jd["idExamen"])
            cargo=Cargos.objects.get(id=jd["idcargo"])
            Tipo_Examen_X_Cargo.objects.create(examen=tipo_Examen, cargo=cargo )
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except:
            datos = {'message': "Error. Compruebe Datos"}
            return JsonResponse(datos)
# --------------------------------------------------------------------------------------------------------------------------------------------------------
class Documentos(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        try:
            examen=Examen.objects.get(id=request.POST['examen'])
            Archivo.objects.create(nombre=request.POST['nombre'], archivo=request.FILES['imagen'], examen=examen)
            datos = {'message': "Registro Completado"}
            return JsonResponse(datos)
        except Exception as ex:
            print("Error", ex)
            print("valor", type(ex))
            datos = {'message': "Error. Compruebe Datos"}
            return JsonResponse(datos)
   
# CLASE PARA LOGUIARSE   :)
class Login(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        datos = json.loads(request.body)
        try:
            cursor=connection.cursor()
            # nuestro query
            query=f"SELECT usuario, contraseña FROM personal WHERE usuario='{datos['Usuario']}';"
            cursor.execute(query)
            respuesta=dictfetchall(cursor)
            # se comprueba de que exita un el usuario

            if(len(respuesta)==0):
                response={'message': "Usuario no existe", "usuario":None}
                return JsonResponse(response)
            else:
                # se comprueba de que la contraseña este correcta

                contraseñas = desencriptado_contraseña(respuesta[0]["contraseña"], datos['Password'])
                if(contraseñas):
                    # nuevo query para pedir todos los datos necesarios
                    newquery=f"SELECT pl.id, pl.usuario, pl.credencial, ps.nombres, ps.apellidos, ps.sexo, c.id AS id_cargo, c.nombre AS cargo  FROM personal pl LEFT JOIN personas ps ON pl.persona = ps.id LEFT JOIN cargos c ON pl.cargo = c.id WHERE pl.usuario='{datos['Usuario']}';"
                    cursor.execute(newquery)
                    Newrespuesta=dictfetchall(cursor)
                    response={'message': "Acceso permitido", 'permiso':True, "usuario":Newrespuesta[0]}
                    return JsonResponse(response)
                else:
                    response={'message': "Contraseña incorrecta", "usuario":None}
                    return JsonResponse(response)
        except Exception as ex:
            print("Error", ex)
            cursor.close()
            connection.close()
        finally:
            cursor.close()
            connection.close()
            
# funcion para retornar un diccionario con los campos
def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]