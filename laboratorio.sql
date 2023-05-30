-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2023 a las 04:01:42
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laboratorio`
--
CREATE DATABASE IF NOT EXISTS `laboratorio` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `laboratorio`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo`
--

CREATE TABLE `archivo` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(400) DEFAULT NULL,
  `archivo` varchar(100) NOT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `examen` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `archivo`:
--   `examen`
--       `examen` -> `id`
--

--
-- Volcado de datos para la tabla `archivo`
--

INSERT INTO `archivo` (`id`, `nombre`, `archivo`, `fecha_registro`, `examen`) VALUES
(1, 'Sasha_Hernandez_Rodriguez_Perez_10564897_Examen_De_Orina_2023_4_19_21_14_18', 'archivos/2023/05/19/Sasha_Hernandez_Rodriguez_Perez_10564897_Examen_De_Orina_2023_4_19_21_14_18.pdf', '2023-05-19 21:15:20.009400', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `auth_group`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `auth_group_permissions`:
--   `permission_id`
--       `auth_permission` -> `id`
--   `group_id`
--       `auth_group` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `auth_permission`:
--   `content_type_id`
--       `django_content_type` -> `id`
--

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add cargos', 7, 'add_cargos'),
(26, 'Can change cargos', 7, 'change_cargos'),
(27, 'Can delete cargos', 7, 'delete_cargos'),
(28, 'Can view cargos', 7, 'view_cargos'),
(29, 'Can add codigo_ area', 8, 'add_codigo_area'),
(30, 'Can change codigo_ area', 8, 'change_codigo_area'),
(31, 'Can delete codigo_ area', 8, 'delete_codigo_area'),
(32, 'Can view codigo_ area', 8, 'view_codigo_area'),
(33, 'Can add examen', 9, 'add_examen'),
(34, 'Can change examen', 9, 'change_examen'),
(35, 'Can delete examen', 9, 'delete_examen'),
(36, 'Can view examen', 9, 'view_examen'),
(37, 'Can add personas', 10, 'add_personas'),
(38, 'Can change personas', 10, 'change_personas'),
(39, 'Can delete personas', 10, 'delete_personas'),
(40, 'Can view personas', 10, 'view_personas'),
(41, 'Can add tipo_ examen', 11, 'add_tipo_examen'),
(42, 'Can change tipo_ examen', 11, 'change_tipo_examen'),
(43, 'Can delete tipo_ examen', 11, 'delete_tipo_examen'),
(44, 'Can view tipo_ examen', 11, 'view_tipo_examen'),
(45, 'Can add tipo_ muestra', 12, 'add_tipo_muestra'),
(46, 'Can change tipo_ muestra', 12, 'change_tipo_muestra'),
(47, 'Can delete tipo_ muestra', 12, 'delete_tipo_muestra'),
(48, 'Can view tipo_ muestra', 12, 'view_tipo_muestra'),
(49, 'Can add valores_ predeterminados', 13, 'add_valores_predeterminados'),
(50, 'Can change valores_ predeterminados', 13, 'change_valores_predeterminados'),
(51, 'Can delete valores_ predeterminados', 13, 'delete_valores_predeterminados'),
(52, 'Can view valores_ predeterminados', 13, 'view_valores_predeterminados'),
(53, 'Can add tipo_ examen_ x_ valores_ predeterminados', 14, 'add_tipo_examen_x_valores_predeterminados'),
(54, 'Can change tipo_ examen_ x_ valores_ predeterminados', 14, 'change_tipo_examen_x_valores_predeterminados'),
(55, 'Can delete tipo_ examen_ x_ valores_ predeterminados', 14, 'delete_tipo_examen_x_valores_predeterminados'),
(56, 'Can view tipo_ examen_ x_ valores_ predeterminados', 14, 'view_tipo_examen_x_valores_predeterminados'),
(57, 'Can add tipo_ examen_ x_ tipo_ muestra', 15, 'add_tipo_examen_x_tipo_muestra'),
(58, 'Can change tipo_ examen_ x_ tipo_ muestra', 15, 'change_tipo_examen_x_tipo_muestra'),
(59, 'Can delete tipo_ examen_ x_ tipo_ muestra', 15, 'delete_tipo_examen_x_tipo_muestra'),
(60, 'Can view tipo_ examen_ x_ tipo_ muestra', 15, 'view_tipo_examen_x_tipo_muestra'),
(61, 'Can add tipo_ examen_ x_ cargo', 16, 'add_tipo_examen_x_cargo'),
(62, 'Can change tipo_ examen_ x_ cargo', 16, 'change_tipo_examen_x_cargo'),
(63, 'Can delete tipo_ examen_ x_ cargo', 16, 'delete_tipo_examen_x_cargo'),
(64, 'Can view tipo_ examen_ x_ cargo', 16, 'view_tipo_examen_x_cargo'),
(65, 'Can add personal', 17, 'add_personal'),
(66, 'Can change personal', 17, 'change_personal'),
(67, 'Can delete personal', 17, 'delete_personal'),
(68, 'Can view personal', 17, 'view_personal'),
(69, 'Can add paciente', 18, 'add_paciente'),
(70, 'Can change paciente', 18, 'change_paciente'),
(71, 'Can delete paciente', 18, 'delete_paciente'),
(72, 'Can view paciente', 18, 'view_paciente'),
(73, 'Can add muestras', 19, 'add_muestras'),
(74, 'Can change muestras', 19, 'change_muestras'),
(75, 'Can delete muestras', 19, 'delete_muestras'),
(76, 'Can view muestras', 19, 'view_muestras'),
(77, 'Can add archivo', 20, 'add_archivo'),
(78, 'Can change archivo', 20, 'change_archivo'),
(79, 'Can delete archivo', 20, 'delete_archivo'),
(80, 'Can view archivo', 20, 'view_archivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `auth_user`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `auth_user_groups`:
--   `group_id`
--       `auth_group` -> `id`
--   `user_id`
--       `auth_user` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `auth_user_user_permissions`:
--   `permission_id`
--       `auth_permission` -> `id`
--   `user_id`
--       `auth_user` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `cargos`:
--

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`) VALUES
(2, 'Analista Clínico'),
(1, 'Biólogo'),
(3, 'Enfermera'),
(5, 'Gerente De Laboratorio'),
(8, 'Medico'),
(6, 'Patólogo Clínico'),
(9, 'Radiólogo'),
(4, 'Técnico De Laboratorio'),
(7, 'Técnico Radiólogo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigo_area`
--

CREATE TABLE `codigo_area` (
  `id` bigint(20) NOT NULL,
  `codigo_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `codigo_area`:
--

--
-- Volcado de datos para la tabla `codigo_area`
--

INSERT INTO `codigo_area` (`id`, `codigo_area`) VALUES
(1, 212),
(6, 412),
(2, 414),
(5, 416),
(3, 424),
(4, 426);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `django_admin_log`:
--   `content_type_id`
--       `django_content_type` -> `id`
--   `user_id`
--       `auth_user` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `django_content_type`:
--

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(20, 'api', 'archivo'),
(7, 'api', 'cargos'),
(8, 'api', 'codigo_area'),
(9, 'api', 'examen'),
(19, 'api', 'muestras'),
(18, 'api', 'paciente'),
(17, 'api', 'personal'),
(10, 'api', 'personas'),
(11, 'api', 'tipo_examen'),
(16, 'api', 'tipo_examen_x_cargo'),
(15, 'api', 'tipo_examen_x_tipo_muestra'),
(14, 'api', 'tipo_examen_x_valores_predeterminados'),
(12, 'api', 'tipo_muestra'),
(13, 'api', 'valores_predeterminados'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `django_migrations`:
--

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-05-19 16:28:06.183200'),
(2, 'auth', '0001_initial', '2023-05-19 16:28:21.554200'),
(3, 'admin', '0001_initial', '2023-05-19 16:28:24.412800'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-05-19 16:28:24.490800'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-05-19 16:28:24.553200'),
(6, 'api', '0001_initial', '2023-05-19 16:28:58.517400'),
(7, 'contenttypes', '0002_remove_content_type_name', '2023-05-19 16:29:00.044800'),
(8, 'auth', '0002_alter_permission_name_max_length', '2023-05-19 16:29:01.260400'),
(9, 'auth', '0003_alter_user_email_max_length', '2023-05-19 16:29:02.621800'),
(10, 'auth', '0004_alter_user_username_opts', '2023-05-19 16:29:02.667800'),
(11, 'auth', '0005_alter_user_last_login_null', '2023-05-19 16:29:03.394600'),
(12, 'auth', '0006_require_contenttypes_0002', '2023-05-19 16:29:03.695200'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2023-05-19 16:29:03.781800'),
(14, 'auth', '0008_alter_user_username_max_length', '2023-05-19 16:29:04.969600'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2023-05-19 16:29:05.961200'),
(16, 'auth', '0010_alter_group_name_max_length', '2023-05-19 16:29:06.999600'),
(17, 'auth', '0011_update_proxy_permissions', '2023-05-19 16:29:07.122200'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2023-05-19 16:29:08.472400'),
(19, 'sessions', '0001_initial', '2023-05-19 16:29:09.593400'),
(20, 'api', '0002_alter_tipo_examen_description', '2023-05-19 17:55:12.151800'),
(21, 'api', '0003_alter_valores_predeterminados_unidad', '2023-05-19 20:12:34.513000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `django_session`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `id` bigint(20) NOT NULL,
  `fecha_registro` date NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_finalizacion` datetime(6) DEFAULT NULL,
  `observaciones` longtext,
  `paciente` bigint(20) NOT NULL,
  `personal_finalizacion` bigint(20) DEFAULT NULL,
  `personal_registro` bigint(20) NOT NULL,
  `tipo` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `examen`:
--   `paciente`
--       `paciente` -> `id`
--   `personal_finalizacion`
--       `personal` -> `id`
--   `personal_registro`
--       `personal` -> `id`
--   `tipo`
--       `tipo_examen` -> `id`
--

--
-- Volcado de datos para la tabla `examen`
--

INSERT INTO `examen` (`id`, `fecha_registro`, `estado`, `fecha_finalizacion`, `observaciones`, `paciente`, `personal_finalizacion`, `personal_registro`, `tipo`) VALUES
(6, '2023-05-19', 0, NULL, NULL, 3, NULL, 6, 2),
(7, '2023-05-19', 1, '2023-05-19 21:15:19.433400', 'SIN OBSERVACIONES', 3, 7, 6, 17),
(8, '2023-05-19', 0, NULL, NULL, 3, NULL, 6, 18),
(9, '2023-05-19', 0, NULL, NULL, 3, NULL, 6, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestras`
--

CREATE TABLE `muestras` (
  `id` bigint(20) NOT NULL,
  `fecha_registro` date NOT NULL,
  `fecha_extraccion` date NOT NULL,
  `numero` int(11) NOT NULL,
  `lote` varchar(8) DEFAULT NULL,
  `interno` tinyint(1) NOT NULL,
  `examen` bigint(20) NOT NULL,
  `personal` bigint(20) NOT NULL,
  `tipo_muestra` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `muestras`:
--   `examen`
--       `examen` -> `id`
--   `personal`
--       `personal` -> `id`
--   `tipo_muestra`
--       `tipo_muestra` -> `id`
--

--
-- Volcado de datos para la tabla `muestras`
--

INSERT INTO `muestras` (`id`, `fecha_registro`, `fecha_extraccion`, `numero`, `lote`, `interno`, `examen`, `personal`, `tipo_muestra`) VALUES
(2, '2023-05-19', '2023-05-19', 1, NULL, 1, 7, 6, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` bigint(20) NOT NULL,
  `cedula` int(11) NOT NULL,
  `telefono` int(11) NOT NULL,
  `direccion` varchar(300) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `codigo_telefonico` bigint(20) NOT NULL,
  `persona` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `paciente`:
--   `codigo_telefonico`
--       `codigo_area` -> `id`
--   `persona`
--       `personas` -> `id`
--

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `cedula`, `telefono`, `direccion`, `correo_electronico`, `fecha_nacimiento`, `codigo_telefonico`, `persona`) VALUES
(1, 29543478, 1385451, '5ta Transversal deRupertolugo casa Nº5', 'paola@gmail.com', '2004-01-03', 1, 2),
(2, 30565353, 2685451, 'Propatria Casalta 3 ', 'Gimenezgmail.com', '2005-01-03', 2, 4),
(3, 10564897, 1115715, 'Coche. Edificio 5 Apartamen 1-B', 'jduegrs@gmail.com', '2004-05-23', 3, 6),
(4, 5980460, 2145747, 'Av. Sucre Municipio libertador ', 'medina2cds@gmail.com', '2003-01-30', 2, 7),
(5, 5987451, 1547847, 'Altavizta Flores de Catia', 'ademdhue@gmail.com', '2000-06-20', 4, 9),
(6, 29547863, 8547925, 'Agua Salud, por el molino', 'raynerl@gmail.com', '2000-09-20', 3, 10),
(7, 28974473, 1473952, 'La Rinconada', 'fafr154qe@gmail.com', '1999-10-25', 2, 11),
(8, 13547985, 1473475, 'Por los miradores de Catia', 'dagfr154qe@gmail.com', '1999-10-25', 2, 12),
(9, 25698745, 1476475, 'Por los miradores de Catia', 'dagda54qe@gmail.com', '1990-10-25', 3, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id` bigint(20) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `credencial` varchar(10) NOT NULL,
  `cargo` bigint(20) NOT NULL,
  `persona` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `personal`:
--   `cargo`
--       `cargos` -> `id`
--   `persona`
--       `personas` -> `id`
--

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id`, `usuario`, `contraseña`, `credencial`, `cargo`, `persona`) VALUES
(1, 'Zambra15410', 'pbkdf2:sha256:260000$ckx2XsSQ5Uyk88v54t7MScA1BpiJ9d$94a81ccebe2e462db49ca6e3032c2e6c8cb2fe368924053c760e10ff4767d490', 'S15G7R46W', 3, 1),
(2, 'Valle1541', 'pbkdf2:sha256:260000$dSHKDcPCLww87BxcaFmlzUv3rcNTEO$ace26dcb1c68a61181faad1aee0d44f531cf96aa35338913b8e6e0d354f8d642', 'F4T8J1T7F', 1, 3),
(3, 'p3dr0', 'pbkdf2:sha256:260000$3kHe74z83Z5jdFvpVHRPUGkryGuRG3$1dd3e8b9d934d090615089d3eb2e09f1cd2b3aa231ebb08aa02e197f9529c36e', 'F4T8J1T7F', 9, 8),
(4, 'GOMEZ45D', 'pbkdf2:sha256:260000$Njrafnl3x8h4XD2161adymDl8JWKsh$01c7a1f8b4537d9f95e4d8ce4f6e3d3bf39c62719ed1a78b746f269df4b86fff', 'D454FR7G', 8, 9),
(5, 'Adeleinys', 'pbkdf2:sha256:260000$UMwXyPCtEcS5Qdt4nkNmc9WGbKm4bw$e135e660afdd225eee1c5fc0b6cfc7b788c056cb64e9f17ede83a589c9f3c42e', 'D24fFRe', 5, 5),
(6, 'luisa', 'pbkdf2:sha256:260000$CqYwRqFnRxbYydeoaYSHe6peY2FdV7$c8406452f4c4392ef2c5ddcff91c31c36bec540cbef26f530a96b0232ce71736', 'D24FfFRe', 3, 14),
(7, 'perez', 'pbkdf2:sha256:260000$5N2RtbONlQwRdWeg6ZLzK5W4dFDQEP$20f33149a9517bb02b4e85d1dbb125a52dc9f4a9c87c2ebdb4a55cfde90cbd84', 'W45FfFRe', 1, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` bigint(20) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `sexo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `personas`:
--

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `nombres`, `apellidos`, `sexo`) VALUES
(1, 'Emilys Ramirez', 'Hoyos Zambrano', 'Femenino'),
(2, 'Evelyn Ramirez', 'Quintana Zambrano', 'Femenino'),
(3, 'Paola Camila', 'Zambrano Del Valle', 'Femenino'),
(4, 'Luisa Arizmendi', 'Caceres Josefa', 'Femenino'),
(5, 'Adeleiny Nazareth', 'Medina Camacho', 'Femenino'),
(6, 'Sasha Hernandez', 'Rodriguez Perez', 'Femenino'),
(7, 'Keila Mendoza', 'Perez Guimenez', 'Femenino'),
(8, 'Pedro Egnis', 'Medina Camacho', 'Masculino'),
(9, 'Kevin Ramirez', 'Miranza Bryan', 'Masculino'),
(10, 'Raynerl Miguel', 'Lopez Quintana', 'Masculino'),
(11, 'Edgar Gonzalez', 'Lopez Del Carmen', 'Masculino'),
(12, 'Josue Lopez', 'Gabriel Luna', 'Masculino'),
(13, 'Ricardo Gonzalez', 'Gabriel Luna', 'Masculino'),
(14, 'Luisa Miransa', 'Ramirez Luna', 'Masculino'),
(15, 'Perez Gomez', 'Ricardo Luis', 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_examen`
--

CREATE TABLE `tipo_examen` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `muestra` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `tipo_examen`:
--

--
-- Volcado de datos para la tabla `tipo_examen`
--

INSERT INTO `tipo_examen` (`id`, `nombre`, `description`, `muestra`) VALUES
(1, 'Radiografía Abdominal', 'Es un examen imagenológico para observar órganos y estructuras en el abdome. Los órganos incluyen el bazo, el estómago y los intestinos. Cuando este examen se hace para observar las estructuras de la vejiga y el riñón, se denomina radiografía de RUV (riñones, uréteres y vejiga)', 0),
(2, 'Radiografía De Hueso', 'Una radiografía del hueso es un examen imagenológico para examinar los huesos.', 0),
(3, 'Radiografía Torácica', 'Es una radiografía del tórax, los pulmones, el corazón, las grandes arterias, las costillas y el diafragma.', 0),
(4, 'Radiografía De La Pelvis', 'Una radiografía de la pelvis, es una imagen de los huesos que rodean la zona de la cadera. La pelvis conecta las piernas al cuerpo.', 0),
(5, 'Radiografía De Cuello', 'Es un examen imagenológico para examinar las vértebras cervicales. Estas son los 7 huesos de la columna que se encuentran en el cuello.', 0),
(6, 'Radiografía De La Columna Lumbosacra', 'Una radiografía de la columna lumbosacra es una imagen de los pequeños huesos (vértebras) en la parte baja de la columna. Esta zona incluye la región lumbar y el sacro, la zona que conecta la columna con la pelvis.', 0),
(7, 'Radiografía De Cráneo', 'Una radiografía del cráneo es una imagen de los huesos que rodean el cerebro, entre ellos, los huesos faciales, la nariz y los senos paranasales.', 0),
(8, 'Radiografía De Las Manos', 'Es una radiografía de una o ambas manos.', 0),
(9, 'Radiografía De La Columna Torácica', 'Es una radiografía de los 12 huesos (vértebras) del tórax (torácicos) de la columna vertebral. Las vértebras están separadas por almohadillas cartilaginosas planas llamadas discos que brindan amortiguación entre los huesos.', 0),
(10, 'Resonancia Magnética Del Abdomen', 'Una resonancia magnética (RM) del abdomen es un examen imagenológico que utiliza imanes y ondas de radio potentes. Estas ondas crean imágenes del interior de la zona abdominal. No emplea radiación (rayos X).', 0),
(11, 'Resonancia Magnética Cervical', 'Una IRM (imagen por resonancia magnética) cervical utiliza energía de imanes potentes para crear imágenes de la parte de la columna que pasa a través de la zona del cuello (columna cervical).La IRM no emplea radiación (rayos X).', 0),
(12, 'Resonancia Magnética Del Tórax', 'Es un examen de diagnóstico por imágenes que utiliza potentes campos magnéticos y ondas de radio para crear imágenes del pecho (zona torácica). No emplea radiación (rayos x).', 0),
(13, 'Resonancia Magnética De La Cabeza', 'Una RM (resonancia magnética) de la cabeza es un examen imagenológico que utiliza imanes y ondas de radio potentes para crear imágenes del cerebro y de los tejidos circundantes.No emplea radiación.', 0),
(14, 'Resonancia Magnética Del Corazón', 'La resonancia magnética del corazón es un método imagenológico que usa imanes y ondas de radio potentes para crear imágenes del corazón. No utiliza radiación (rayos X).', 0),
(15, 'Resonancia Magnética De La Pelvis', 'Una resonancia magnética (RM) de la pelvis es un examen imagenológico en el que se utiliza una máquina con imanes y ondas de radio potentes para crear imágenes de la zona entre los huesos de la cadera. Esta parte del cuerpo se denomina zona pélvica.Las estructuras dentro y cerca de la pelvis incluyen la vejiga, la próstata y otros órganos reproductores masculinos, los órganos reproductores femeninos, los ganglios linfáticos, el intestino grueso, el intestino delgado y los huesos de la pelvis.', 0),
(16, 'Resonancia Magnética De La Región Lumbar', 'Una IRM (imágenes por resonancia magnética) lumbar utiliza energía de imanes potentes para crear imágenes de la parte baja de la espalda (columna lumbar). Una IRM no usa radiación (rayos X).', 0),
(17, 'Examen De Orina', 'na prueba llamada uroanálisis revisa una muestra de orina para detectar si hay sangre en la orina o alguna otra anomalia.', 1),
(18, 'Examen De Heces', 'El análisis de heces es una serie de pruebas que se realizan en una muestra de heces (materia fecal) para ayudar a diagnosticar ciertas afecciones que afectan el tubo digestivo . Estas afecciones pueden incluir infección (como de parásitos , virus o bacterias ), absorción deficiente de nutrientes o cáncer.', 1),
(19, 'Hematología Completa', 'El hemograma completo es un análisis de sangre. Se utiliza para examinar el estado general de salud y detectar una amplia variedad de afecciones, como anemia, una infección y leucemia. Un hemograma completo mide lo siguiente: Los glóbulos rojos, que transportan el oxígeno', 1),
(20, 'Prueba De Ets', 'Conjunto de diagnosticos para determinar si posee alguna ETS', 1),
(21, 'Examen De Glucemia', 'Un examen de azúcar en sangre mide la cantidad de un azúcar llamado glucosa en una muestra de sangre.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_examen_has_cargo`
--

CREATE TABLE `tipo_examen_has_cargo` (
  `id` bigint(20) NOT NULL,
  `cargo` bigint(20) NOT NULL,
  `examen` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `tipo_examen_has_cargo`:
--   `cargo`
--       `cargos` -> `id`
--   `examen`
--       `tipo_examen` -> `id`
--

--
-- Volcado de datos para la tabla `tipo_examen_has_cargo`
--

INSERT INTO `tipo_examen_has_cargo` (`id`, `cargo`, `examen`) VALUES
(1, 7, 1),
(2, 7, 2),
(3, 7, 3),
(4, 7, 4),
(5, 7, 5),
(6, 7, 6),
(7, 7, 7),
(8, 7, 8),
(9, 7, 9),
(10, 9, 1),
(11, 9, 2),
(12, 9, 3),
(13, 9, 4),
(14, 9, 5),
(15, 9, 6),
(16, 9, 7),
(17, 9, 8),
(18, 9, 9),
(19, 9, 10),
(20, 9, 11),
(21, 9, 12),
(22, 9, 13),
(23, 9, 14),
(24, 9, 15),
(25, 9, 16),
(26, 7, 10),
(27, 7, 11),
(28, 7, 12),
(29, 7, 13),
(30, 7, 14),
(31, 7, 15),
(32, 7, 16),
(33, 1, 17),
(34, 2, 17),
(35, 2, 18),
(36, 1, 18),
(37, 1, 19),
(38, 2, 19),
(39, 4, 19),
(40, 1, 21),
(41, 2, 21),
(42, 2, 20),
(43, 1, 20),
(44, 6, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_examen_has_tipo_muestra`
--

CREATE TABLE `tipo_examen_has_tipo_muestra` (
  `id` bigint(20) NOT NULL,
  `examen` bigint(20) NOT NULL,
  `tipo_muestra` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `tipo_examen_has_tipo_muestra`:
--   `examen`
--       `tipo_examen` -> `id`
--   `tipo_muestra`
--       `tipo_muestra` -> `id`
--

--
-- Volcado de datos para la tabla `tipo_examen_has_tipo_muestra`
--

INSERT INTO `tipo_examen_has_tipo_muestra` (`id`, `examen`, `tipo_muestra`) VALUES
(1, 17, 2),
(2, 18, 3),
(3, 19, 24),
(4, 21, 24),
(5, 20, 24),
(6, 20, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_examen_has_valores_predeterminados`
--

CREATE TABLE `tipo_examen_has_valores_predeterminados` (
  `id` bigint(20) NOT NULL,
  `tipo_examen` bigint(20) NOT NULL,
  `valor_predeterminado` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `tipo_examen_has_valores_predeterminados`:
--   `tipo_examen`
--       `tipo_examen` -> `id`
--   `valor_predeterminado`
--       `valores_predeterminados` -> `id`
--

--
-- Volcado de datos para la tabla `tipo_examen_has_valores_predeterminados`
--

INSERT INTO `tipo_examen_has_valores_predeterminados` (`id`, `tipo_examen`, `valor_predeterminado`) VALUES
(1, 19, 1),
(2, 19, 2),
(3, 19, 3),
(4, 19, 4),
(5, 19, 5),
(6, 19, 6),
(7, 19, 7),
(8, 19, 8),
(9, 19, 9),
(10, 19, 10),
(11, 19, 11),
(12, 21, 12),
(13, 20, 13),
(14, 20, 14),
(15, 20, 15),
(16, 20, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_muestra`
--

CREATE TABLE `tipo_muestra` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `tipo_muestra`:
--

--
-- Volcado de datos para la tabla `tipo_muestra`
--

INSERT INTO `tipo_muestra` (`id`, `nombre`) VALUES
(15, 'Cabello'),
(22, 'Exudado De Lesión Cutánea'),
(17, 'Exudado Herido Quirúrgica'),
(19, 'Exudado Nasal'),
(18, 'Exudado Ótico'),
(21, 'Exudado Uretral Femenino'),
(20, 'Exudado Vaginal'),
(7, 'Liquido Ascítico'),
(6, 'Líquido Cefalorraquídeo'),
(8, 'Liquido Pleural'),
(23, 'Liquido Sinovial'),
(13, 'Médula Ósea'),
(3, 'Muestra De Heces'),
(2, 'Muestra De Orina 24Hr'),
(11, 'Piel'),
(5, 'Plasma'),
(10, 'Saliva'),
(24, 'Sangre'),
(14, 'Sangre De Cordón Umbilical'),
(12, 'Semen'),
(9, 'Sudor'),
(4, 'Suero'),
(16, 'Uñas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valores_predeterminados`
--

CREATE TABLE `valores_predeterminados` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `valor_minimo` double DEFAULT NULL,
  `valor_maximo` double DEFAULT NULL,
  `unidad` varchar(10) DEFAULT NULL,
  `decorador` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `valores_predeterminados`:
--

--
-- Volcado de datos para la tabla `valores_predeterminados`
--

INSERT INTO `valores_predeterminados` (`id`, `nombre`, `valor_minimo`, `valor_maximo`, `unidad`, `decorador`) VALUES
(1, 'HEMATIES', 3.8, 5.5, 'mm3', 'X 10.6'),
(2, 'HEMOGLOBINA', 11, 16.5, 'g/dl', NULL),
(3, 'HEMATOCRITO', 35, 51, '%', NULL),
(4, 'VCM', 80, 100, 'fl', NULL),
(5, 'HCM', 27, 34, 'pg', NULL),
(6, 'CHCM', 32, 36, 'g/dl', NULL),
(7, 'CONTAJE DE BLANCOS', 3.5, 10, 'mm3', 'x 1000'),
(8, 'SEGMENTADOS', 20, 40, '%', NULL),
(9, 'CELULAS MEDIA', 3, 14, '%', NULL),
(10, 'LEUCOCITOS', 4.5, 10.5, 'cel/mm3', NULL),
(11, 'CONTAJE DE PLAQUETAS', 150, 450, 'cel/mm3', 'x 1000'),
(12, 'GLICEMIA BASAL', 70, 110, 'MG/DL', NULL),
(13, 'PRUEBA VIH', NULL, NULL, NULL, NULL),
(14, 'PRUEBA HEPATITIS C', NULL, NULL, NULL, NULL),
(15, 'PRUEBA CLAMIDIA', NULL, NULL, NULL, NULL),
(16, 'PRUEBA SIFILIS', NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `archivo_examen_62ae33ef_fk_examen_id` (`examen`);

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `codigo_area`
--
ALTER TABLE `codigo_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_area` (`codigo_area`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examen_paciente_e33723a1_fk_paciente_id` (`paciente`),
  ADD KEY `examen_personal_finalizacion_2c5860de_fk_personal_id` (`personal_finalizacion`),
  ADD KEY `examen_personal_registro_b7b64426_fk_personal_id` (`personal_registro`),
  ADD KEY `examen_tipo_3cde6b24_fk_tipo_examen_id` (`tipo`);

--
-- Indices de la tabla `muestras`
--
ALTER TABLE `muestras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `muestras_examen_e38ebb01_fk_examen_id` (`examen`),
  ADD KEY `muestras_personal_1ee9fc9f_fk_personal_id` (`personal`),
  ADD KEY `muestras_tipo_muestra_56bcc80c_fk_tipo_muestra_id` (`tipo_muestra`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD UNIQUE KEY `persona` (`persona`),
  ADD KEY `paciente_codigo_telefonico_e321bd1f_fk_codigo_area_id` (`codigo_telefonico`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `persona` (`persona`),
  ADD KEY `personal_cargo_f01a7e42_fk_cargos_id` (`cargo`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `tipo_examen_has_cargo`
--
ALTER TABLE `tipo_examen_has_cargo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_examen_has_cargo_cargo_f38dcad5_fk_cargos_id` (`cargo`),
  ADD KEY `tipo_examen_has_cargo_examen_1fa3d861_fk_tipo_examen_id` (`examen`);

--
-- Indices de la tabla `tipo_examen_has_tipo_muestra`
--
ALTER TABLE `tipo_examen_has_tipo_muestra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_examen_has_tipo_muestra_examen_db18d8f0_fk_tipo_examen_id` (`examen`),
  ADD KEY `tipo_examen_has_tipo_tipo_muestra_e52e91a3_fk_tipo_mues` (`tipo_muestra`);

--
-- Indices de la tabla `tipo_examen_has_valores_predeterminados`
--
ALTER TABLE `tipo_examen_has_valores_predeterminados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_examen_has_valo_tipo_examen_e071f837_fk_tipo_exam` (`tipo_examen`),
  ADD KEY `tipo_examen_has_valo_valor_predeterminado_89074b4b_fk_valores_p` (`valor_predeterminado`);

--
-- Indices de la tabla `tipo_muestra`
--
ALTER TABLE `tipo_muestra`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `valores_predeterminados`
--
ALTER TABLE `valores_predeterminados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo`
--
ALTER TABLE `archivo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `codigo_area`
--
ALTER TABLE `codigo_area`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `examen`
--
ALTER TABLE `examen`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `muestras`
--
ALTER TABLE `muestras`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tipo_examen`
--
ALTER TABLE `tipo_examen`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `tipo_examen_has_cargo`
--
ALTER TABLE `tipo_examen_has_cargo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `tipo_examen_has_tipo_muestra`
--
ALTER TABLE `tipo_examen_has_tipo_muestra`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_examen_has_valores_predeterminados`
--
ALTER TABLE `tipo_examen_has_valores_predeterminados`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tipo_muestra`
--
ALTER TABLE `tipo_muestra`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `valores_predeterminados`
--
ALTER TABLE `valores_predeterminados`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD CONSTRAINT `archivo_examen_62ae33ef_fk_examen_id` FOREIGN KEY (`examen`) REFERENCES `examen` (`id`);

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `examen_paciente_e33723a1_fk_paciente_id` FOREIGN KEY (`paciente`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `examen_personal_finalizacion_2c5860de_fk_personal_id` FOREIGN KEY (`personal_finalizacion`) REFERENCES `personal` (`id`),
  ADD CONSTRAINT `examen_personal_registro_b7b64426_fk_personal_id` FOREIGN KEY (`personal_registro`) REFERENCES `personal` (`id`),
  ADD CONSTRAINT `examen_tipo_3cde6b24_fk_tipo_examen_id` FOREIGN KEY (`tipo`) REFERENCES `tipo_examen` (`id`);

--
-- Filtros para la tabla `muestras`
--
ALTER TABLE `muestras`
  ADD CONSTRAINT `muestras_examen_e38ebb01_fk_examen_id` FOREIGN KEY (`examen`) REFERENCES `examen` (`id`),
  ADD CONSTRAINT `muestras_personal_1ee9fc9f_fk_personal_id` FOREIGN KEY (`personal`) REFERENCES `personal` (`id`),
  ADD CONSTRAINT `muestras_tipo_muestra_56bcc80c_fk_tipo_muestra_id` FOREIGN KEY (`tipo_muestra`) REFERENCES `tipo_muestra` (`id`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_codigo_telefonico_e321bd1f_fk_codigo_area_id` FOREIGN KEY (`codigo_telefonico`) REFERENCES `codigo_area` (`id`),
  ADD CONSTRAINT `paciente_persona_10d925d3_fk_personas_id` FOREIGN KEY (`persona`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `personal_cargo_f01a7e42_fk_cargos_id` FOREIGN KEY (`cargo`) REFERENCES `cargos` (`id`),
  ADD CONSTRAINT `personal_persona_30690f8b_fk_personas_id` FOREIGN KEY (`persona`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `tipo_examen_has_cargo`
--
ALTER TABLE `tipo_examen_has_cargo`
  ADD CONSTRAINT `tipo_examen_has_cargo_cargo_f38dcad5_fk_cargos_id` FOREIGN KEY (`cargo`) REFERENCES `cargos` (`id`),
  ADD CONSTRAINT `tipo_examen_has_cargo_examen_1fa3d861_fk_tipo_examen_id` FOREIGN KEY (`examen`) REFERENCES `tipo_examen` (`id`);

--
-- Filtros para la tabla `tipo_examen_has_tipo_muestra`
--
ALTER TABLE `tipo_examen_has_tipo_muestra`
  ADD CONSTRAINT `tipo_examen_has_tipo_muestra_examen_db18d8f0_fk_tipo_examen_id` FOREIGN KEY (`examen`) REFERENCES `tipo_examen` (`id`),
  ADD CONSTRAINT `tipo_examen_has_tipo_tipo_muestra_e52e91a3_fk_tipo_mues` FOREIGN KEY (`tipo_muestra`) REFERENCES `tipo_muestra` (`id`);

--
-- Filtros para la tabla `tipo_examen_has_valores_predeterminados`
--
ALTER TABLE `tipo_examen_has_valores_predeterminados`
  ADD CONSTRAINT `tipo_examen_has_valo_tipo_examen_e071f837_fk_tipo_exam` FOREIGN KEY (`tipo_examen`) REFERENCES `tipo_examen` (`id`),
  ADD CONSTRAINT `tipo_examen_has_valo_valor_predeterminado_89074b4b_fk_valores_p` FOREIGN KEY (`valor_predeterminado`) REFERENCES `valores_predeterminados` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
