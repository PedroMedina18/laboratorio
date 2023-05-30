from django.urls import path
from .views import Personal_viws, Login, Documentos, Cargos_views, Examen_Cargo,Valores_Predeterminados_views, Asignacion_Valores,  Examen_Informacion, Tipo_Examen_Cargo, Personas_views, Pacientes_viws, Tipo_Examen_viws, Examen_viws, Muestra_view, TipoMuestras_views, Codigo_area_viws, Asignacion_Muestras, Asignacion_Examen

urlpatterns = [
    # url para el registro y la busquedad de los cargos
    path('cargos/', Cargos_views.as_view(), name='cargo'),
    # --------------------------------------------------------------------------------------------------------------------------------
    
    path('codigo_area/', Codigo_area_viws.as_view(), name='codigo_area'),
    path('personas/', Personas_views.as_view(), name='personas'),
    path('personal/', Personal_viws.as_view(), name='personal'),
    path('valores/', Valores_Predeterminados_views.as_view(), name='valores'),
    path('valores_examenes/', Asignacion_Valores.as_view(), name='valores_examen'),
    path('valores_examenes/<int:idExamen>/', Asignacion_Valores.as_view(), name='busquedad_valores'),

    # --------------------------------------------------------------------------------------------------------------------------------
    
    # url para el registro de los examenes y su busquedad mediante condiciones GET Y POST
    path('examen/', Examen_viws.as_view(), name='examen'),
    
    # url para la busquedad y completacion de examenes el campo de indentificador se utiliza como id para la completacion y la cedula del paciente para su busquedad y ciertas condiciones GET 
    path('examen/<int:identificador>/', Examen_viws.as_view(), name='examen'),
    
    # url para la busquedad de toda la informacion realcionada con un examen
    path('examen_informacion/<int:id>/', Examen_Informacion.as_view(), name='examen_informacion'),

    #--------------------------------------------------------------------------------------------------------------------------------
    
    # url para la busquedad de examenes por su cargo y ciertas condiciones GET 
    path('examen_cargo/cargo:<int:idcargo>/', Examen_Cargo.as_view(), name='asignar_examen'),
    
    # url para la busquedad de examenes por su cargo mediante la cedula del paciente y ciertas condiciones GET 
    path('examen_cargo/cargo:<int:idcargo>/paciente:<int:cedula>/', Examen_Cargo.as_view(), name='asignar_examen'),
    
    
    # --------------------------------------------------------------------------------------------------------------------------------
    
    # url para registrar los pacientes solicitarlos todos POST Y GET
    path('pacientes/', Pacientes_viws.as_view(), name='pacientes_list'),
    
    # url para solicitar la informacion de un solo paciente por su cedula todos POST Y GET
    path('pacientes/<int:cedula>/', Pacientes_viws.as_view(), name='paciente'),

    # --------------------------------------------------------------------------------------------------------------------------------
    
    # url para registrar los tipo de examen y para solicitarlos todos POST Y GET
    path('tipo_examen/', Tipo_Examen_viws.as_view(), name='tipo_examen_list'),
    
    #  para solicitar un solo tipo de examen por su id GET
    path('tipo_examen/<int:id>/', Tipo_Examen_viws.as_view(), name='tipo_examen'),
    
    #  para solicitar los tipo de examen de un determinado cargo GET
    path('tipo_examen_cargo/<int:cargo>/', Tipo_Examen_Cargo.as_view(), name='tipo_examen_cargo'),

    # --------------------------------------------------------------------------------------------------------------------------------
    
    # url para registrar las muestras de los examenes y su busquedad POST Y GET
    path('muestra_examen/', Muestra_view.as_view(), name='muestra_examen'),

    # --------------------------------------------------------------------------------------------------------------------------------
   
    # url para registrar los tipo demuestras y buscaralas todas las muestras POST Y GET
    path('tipo_muestra/', TipoMuestras_views.as_view(), name='tipo_muestra_list'),
    
    # url para buscarun tipo de muestra todas  GET
    path('tipo_muestra/<int:id>/', TipoMuestras_views.as_view(), name='tipo_muestra'),

    # --------------------------------------------------------------------------------------------------------------------------------
    
    path('asignar_muestra/', Asignacion_Muestras.as_view(), name='asignar_muestra'),
    path('asignar_examen/', Asignacion_Examen.as_view(), name='asignar_examen'),

    # --------------------------------------------------------------------------------------------------------------------------------
    #Url para agregar los resultadoos en document
    path('resultados/', Documentos.as_view(), name='resultados'),


    # url del login POST
    path('login/', Login.as_view(), name='login')
]
