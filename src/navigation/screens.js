import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { withErrorBoundary } from '../shared/components';
import { useThemeStore } from '../shared/hooks/useThemeStore';

const createLazyScreen = (importer, name) => {
  const LazyScreen = React.lazy(importer);

  function LazyScreenWrapper(props) {
    const { colors } = useThemeStore();

    return (
      <React.Suspense
        fallback={
          <View style={[styles.loader, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        }
      >
        <LazyScreen {...props} />
      </React.Suspense>
    );
  }

  LazyScreenWrapper.displayName = `LazyScreen(${name})`;
  return LazyScreenWrapper;
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Cada pantalla del área autenticada se envuelve una sola vez aquí en un
// ErrorBoundary: un error de render no deja la app en blanco.
export const S = {
  Home: withErrorBoundary(createLazyScreen(() => import('../features/client/screens/HomeScreen').then((m) => ({ default: m.HomeScreen })), 'Home')),
  Perfil: withErrorBoundary(createLazyScreen(() => import('../features/client/screens/PerfilScreen').then((m) => ({ default: m.PerfilScreen })), 'Perfil')),
  Barberos: withErrorBoundary(createLazyScreen(() => import('../features/barbers/screens/BarberosScreen').then((m) => ({ default: m.BarberosScreen })), 'Barberos')),
  Servicios: withErrorBoundary(createLazyScreen(() => import('../features/services/screens/ServiciosScreen').then((m) => ({ default: m.ServiciosScreen })), 'Servicios')),
  Productos: withErrorBoundary(createLazyScreen(() => import('../features/products/screens/ProductosScreen').then((m) => ({ default: m.ProductosScreen })), 'Productos')),
  Carrito: withErrorBoundary(createLazyScreen(() => import('../features/cart/components/CartScreen').then((m) => ({ default: m.CartScreen })), 'Carrito')),
  ReservarCita: withErrorBoundary(createLazyScreen(() => import('../features/appointments/screens/ReservarCitaScreen').then((m) => ({ default: m.ReservarCitaScreen })), 'ReservarCita')),
  MisCitas: withErrorBoundary(createLazyScreen(() => import('../features/appointments/screens/MisCitasScreen').then((m) => ({ default: m.MisCitasScreen })), 'MisCitas')),
  Favoritos: withErrorBoundary(createLazyScreen(() => import('../features/favorites/screens/FavoritosScreen').then((m) => ({ default: m.FavoritosScreen })), 'Favoritos')),
  MisCompras: withErrorBoundary(createLazyScreen(() => import('../features/sales/screens/MisComprasScreen').then((m) => ({ default: m.MisComprasScreen })), 'MisCompras')),
  Facturas: withErrorBoundary(createLazyScreen(() => import('../features/invoices/screens/FacturasScreen').then((m) => ({ default: m.FacturasScreen })), 'Facturas')),
  Reportes: withErrorBoundary(createLazyScreen(() => import('../features/statistics/screens/ReportesScreen').then((m) => ({ default: m.ReportesScreen })), 'Reportes')),
  Reseñas: withErrorBoundary(createLazyScreen(() => import('../features/reviews/screens/ReseñasScreen').then((m) => ({ default: m.ReseñasScreen })), 'Reseñas')),
  ProbarCorte: withErrorBoundary(createLazyScreen(() => import('../features/ai/screens/ProbarCorteScreen').then((m) => ({ default: m.ProbarCorteScreen })), 'ProbarCorte')),
  Galeria: withErrorBoundary(createLazyScreen(() => import('../features/haircut/screens/GaleriaScreen').then((m) => ({ default: m.GaleriaScreen })), 'Galeria')),
};
