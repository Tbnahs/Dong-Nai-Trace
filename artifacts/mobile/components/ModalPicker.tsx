import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

interface ModalPickerProps {
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  /** If provided, show as a standalone labeled field row */
  fieldStyle?: boolean;
  onChange: (val: string) => void;
}

/**
 * A native-style dropdown/select implemented as a modal picker.
 * Matches the visual weight of a portal <select> element.
 */
export function ModalPicker({
  label,
  value,
  options,
  placeholder,
  fieldStyle = true,
  onChange,
}: ModalPickerProps) {
  const colors = useColors();
  const [open, setOpen] = useState(false);

  const display = value || placeholder || 'Chọn...';
  const isPlaceholder = !value;

  return (
    <View style={fieldStyle ? { marginBottom: 12 } : undefined}>
      {fieldStyle && (
        <Text style={[styles.label, { color: colors.foreground, fontFamily: 'BeVietnamPro_500Medium' }]}>
          {label}
        </Text>
      )}

      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.trigger,
          {
            borderColor: colors.border,
            backgroundColor: colors.muted,
          },
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            {
              flex: 1,
              color: isPlaceholder ? colors.mutedForeground : colors.foreground,
              fontFamily: 'BeVietnamPro_400Regular',
            },
          ]}
          numberOfLines={1}
        >
          {display}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.mutedForeground} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Header */}
            <View style={[styles.sheetHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.sheetTitle, { color: colors.foreground, fontFamily: 'BeVietnamPro_700Bold' }]}>
                {label}
              </Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={10}>
                <Ionicons name="close" size={22} color={colors.mutedForeground} />
              </Pressable>
            </View>

            {/* Options */}
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              {options.map((opt) => {
                const selected = opt === value;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => { onChange(opt); setOpen(false); }}
                    style={[
                      styles.option,
                      { borderBottomColor: colors.border },
                      selected && { backgroundColor: '#EFF6FF' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: selected ? colors.primary : colors.foreground,
                          fontFamily: selected ? 'BeVietnamPro_600SemiBold' : 'BeVietnamPro_400Regular',
                        },
                      ]}
                    >
                      {opt}
                    </Text>
                    {selected && (
                      <Ionicons name="checkmark" size={18} color={colors.primary} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, marginBottom: 6 },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  triggerText: { fontSize: 14 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: '70%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  sheetTitle: { fontSize: 16 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: { flex: 1, fontSize: 15 },
});
