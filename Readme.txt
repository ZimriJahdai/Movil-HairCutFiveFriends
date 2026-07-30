# ========================================
# CONFIGURACIÓN DE APIs
#
# Copia estas variables a un archivo .env en la raíz del proyecto.
# El .env está en .gitignore, así que no viaja con el repo: hay que crearlo
# a mano tras clonar, o la app apuntará a localhost y no conectará con nada.
#
# Para los builds de EAS estas mismas URLs están declaradas en eas.json
# (bloque "env" de cada perfil), porque EAS tampoco sube el .env.
# ========================================

# ---------- Backends desplegados (Railway) ----------
# Son públicos: funcionan desde el navegador, desde Expo Go y desde el APK,
# sin necesidad de estar en la misma red que el backend.

EXPO_PUBLIC_AUTH_URL=https://authservice-haircutfivefriends-production.up.railway.app/api/v1
EXPO_PUBLIC_API_URL=https://backend-haircutfivefriends-production.up.railway.app/HaircutFiveFriends/api/v1
EXPO_PUBLIC_AI_URL=https://backend-aiserviceserver-production.up.railway.app

# ---------- Alternativa: backends corriendo en local ----------
# Usa la IP LAN de la máquina del backend, no localhost: un dispositivo físico
# no resuelve el localhost del PC. El emulador de Android usa 10.0.2.2.
#
# AuthService-The5FadeFriends (puerto 3005)
# EXPO_PUBLIC_AUTH_URL=http://192.168.0.6:3005/api/v1
#
# HaircutFiveFriends - API principal (puerto 3006)
# EXPO_PUBLIC_API_URL=http://192.168.0.6:3006/HaircutFiveFriends/api/v1
#
# AI Service - TodoGemini (puerto 8080)
# EXPO_PUBLIC_AI_URL=http://192.168.0.6:8080
