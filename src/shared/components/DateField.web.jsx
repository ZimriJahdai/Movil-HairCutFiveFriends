import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { FONTS, FONT_SIZE, RADIUS, SPACING } from '../constants/theme';
import { useThemeStore } from '../hooks/useThemeStore';

// Versión web de DateField: @react-native-community/datetimepicker no tiene
// implementación para web (solo iOS/Android), así que aquí usamos el input
// nativo del navegador <input type="datetime-local">. Metro resuelve este
// archivo automáticamente en builds web en vez de DateField.jsx.
const toInputValue = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const toMinInputValue = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return undefined;
  return toInputValue(date);
};

export function DateField({ label, error, leftIcon = 'event', value, onChange, minimumDate }) {
  const { colors } = useThemeStore();
  const styles = createStyles(colors);

  const handleChange = (event) => {
    const raw = event.target.value;
    if (!raw) {
      onChange(null);
      return;
    }
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) onChange(parsed);
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.field, error && styles.fieldError]}>
        <MaterialIcons name={leftIcon} size={20} color={colors.textMuted} style={styles.icon} />
        <input
          type="datetime-local"
          value={toInputValue(value)}
          min={toMinInputValue(minimumDate)}
          onChange={handleChange}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            font: 'inherit',
            fontSize: FONT_SIZE.md,
            color: colors.text,
            colorScheme: 'dark',
          }}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (colors) => StyleSheet.create({
  wrapper: { marginBottom: SPACING.lg },
  label: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONTS.semibold,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: SPACING.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: colors.surfaceAlt,
  },
  fieldError: { borderColor: colors.danger },
  icon: { marginRight: SPACING.sm },
  error: {
    fontSize: FONT_SIZE.xs,
    fontFamily: FONTS.medium,
    color: colors.danger,
    marginTop: SPACING.xs,
  },
});
