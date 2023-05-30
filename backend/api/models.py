from django.db import models

# Create your models here.


class Cargos(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table="cargos"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Personas(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10)

    class Meta:
        db_table="personas"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Personal(models.Model):
    usuario = models.CharField(max_length=20, unique=True)
    contraseña = models.CharField(max_length=200)
    credencial = models.CharField(max_length=10)
    cargo = models.ForeignKey(Cargos, on_delete=models.CASCADE, related_name="personal", db_column="cargo")
    persona = models.OneToOneField(Personas, on_delete=models.CASCADE, related_name="personal", db_column="persona")

    class Meta:
        db_table="personal"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Codigo_Area(models.Model):
    codigo_area = models.IntegerField(unique=True)

    class Meta:
        db_table="codigo_area"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Paciente(models.Model):
    cedula = models.IntegerField(unique=True)
    codigo_telefonico =models.ForeignKey(Codigo_Area, on_delete=models.CASCADE, related_name="pacientes", db_column="codigo_telefonico")
    telefono = models.IntegerField()
    direccion = models.CharField(max_length=300)
    correo_electronico = models.EmailField(max_length=100, unique=True)
    fecha_nacimiento = models.DateField()
    persona = models.OneToOneField(Personas, on_delete=models.CASCADE, related_name="paciente", db_column="persona")

    class Meta:
        db_table="paciente"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Tipo_Examen(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=2000)
    muestra = models.BooleanField(default=False)

    class Meta:
        db_table="tipo_examen"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Examen(models.Model):
    paciente=models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name="examen", db_column="paciente")
    tipo=models.ForeignKey(Tipo_Examen, on_delete=models.CASCADE, related_name="examen", db_column="tipo")
    fecha_registro=models.DateField(auto_now_add=True)
    estado=models.BooleanField(default=False)
    fecha_finalizacion=models.DateTimeField(null=True, blank=True)
    personal_registro=models.ForeignKey(Personal, related_name="examen_registro" ,on_delete=models.CASCADE, db_column="personal_registro")
    personal_finalizacion=models.ForeignKey(Personal, related_name="examen_finalizacion" ,on_delete=models.CASCADE,  null=True, blank=True, db_column="personal_finalizacion")
    observaciones = models.TextField(max_length=2000, null=True, blank=True)

    class Meta:
        db_table="examen"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Tipo_Muestra(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table="tipo_muestra"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Muestras(models.Model):
    tipo_muestra = models.ForeignKey(Tipo_Muestra, on_delete=models.CASCADE, related_name="muestras", db_column="tipo_muestra")
    examen = models.ForeignKey(Examen, on_delete=models.CASCADE, related_name="muestras", db_column="examen")
    fecha_registro=models.DateField(auto_now_add=True)
    fecha_extraccion=models.DateField()
    numero=models.IntegerField()
    lote=models.CharField(max_length=8, null=True, blank=True)
    interno=models.BooleanField(default=True)
    personal=models.ForeignKey(Personal, on_delete=models.CASCADE, related_name="muestras", db_column="personal")

    class Meta:
        db_table="muestras"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Valores_Predeterminados(models.Model):
    nombre = models.CharField(max_length=45, unique=True)
    valor_minimo = models.FloatField(null=True, blank=True)
    valor_maximo = models.FloatField(null=True, blank=True)
    unidad = models.CharField(max_length=10, null=True, blank=True)
    decorador = models.CharField(max_length=10, null=True, blank=True)

    class Meta:
        db_table="valores_predeterminados"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Tipo_Examen_X_Valores_Predeterminados(models.Model):
    tipo_examen = models.ForeignKey(Tipo_Examen, on_delete=models.CASCADE, related_name="valores", db_column="tipo_examen")
    valor_predeterminado = models.ForeignKey(Valores_Predeterminados, on_delete=models.CASCADE, related_name="examenes", db_column="valor_predeterminado")

    class Meta:
        db_table="tipo_examen_has_valores_predeterminados"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Tipo_Examen_X_Tipo_Muestra(models.Model):
    examen = models.ForeignKey(Tipo_Examen, on_delete=models.CASCADE, related_name="muestras_asignadas", db_column="examen")
    tipo_muestra = models.ForeignKey(Tipo_Muestra, on_delete=models.CASCADE, related_name="examenes", db_column="tipo_muestra")

    class Meta:
        db_table="tipo_examen_has_tipo_muestra"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Tipo_Examen_X_Cargo(models.Model):
    examen = models.ForeignKey(Tipo_Examen, on_delete=models.CASCADE, related_name="cargo_asignado", db_column="examen")
    cargo = models.ForeignKey(Cargos, on_delete=models.CASCADE, related_name="examenes_asigandos", db_column="cargo")

    class Meta:
        db_table="tipo_examen_has_cargo"
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
class Archivo(models.Model):
    nombre = models.CharField(max_length=400, null=True, blank=True)
    archivo= models.FileField(upload_to="archivos/%Y/%m/%d")
    examen = models.ForeignKey(Examen, on_delete=models.CASCADE, related_name="archivo", db_column="examen")
    fecha_registro=models.DateTimeField(auto_now_add=True)
    

    class Meta:
        db_table="archivo"