import React from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useCheckoutViewModel, METODOS_PAGO, NUMERO_PAGO_MOVIL } from './ViewModel';
import { styles } from './styles';

const formatPrice = (price: number) => `$${price.toFixed(2).replace('.', ',')}`;

const Checkout = ({ route, navigation }: any) => {
  const { subtotal, shipping, total } = route.params;

  const {
    direcciones,
    loading,
    selectedDireccionId,
    setSelectedDireccionId,
    showForm,
    setShowForm,
    form,
    setForm,
    savingDireccion,
    guardarDireccion,
    metodoPago,
    setMetodoPago,
    codigoCupon,
    setCodigoCupon,
    confirming,
    confirmarCompra,
  } = useCheckoutViewModel(subtotal);

  const handleConfirmar = () => {
    confirmarCompra(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Pedidos' }],
      });
    });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#493275" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Finalizar compra</Text>

        <View style={styles.headerRight} />
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>


          <Text style={styles.sectionTitle}>Dirección de envío</Text>

          {direcciones.map((direccion) => (
            <TouchableOpacity
              key={direccion.id}
              style={[
                styles.direccionCard,
                selectedDireccionId === direccion.id && styles.direccionCardSelected,
              ]}
              onPress={() => {
                setSelectedDireccionId(direccion.id);
                setShowForm(false);
              }}
            >
              <Text style={styles.direccionTitle}>{direccion.destinatario}</Text>
              <Text style={styles.direccionText}>
                {direccion.calle}, {direccion.ciudad}
              </Text>
              {!!direccion.telefonoContacto && (
                <Text style={styles.direccionText}>{direccion.telefonoContacto}</Text>
              )}
            </TouchableOpacity>
          ))}

          {!showForm && (
            <TouchableOpacity style={styles.addLink} onPress={() => setShowForm(true)}>
              <Text style={styles.addLinkText}>+ Agregar otra dirección</Text>
            </TouchableOpacity>
          )}

          {showForm && (
            <View style={styles.formCard}>

              <Text style={styles.inputLabel}>Nombre de quien recibe</Text>
              <TextInput
                style={styles.input}
                value={form.destinatario}
                onChangeText={(v) =>
                  setForm({ ...form, destinatario: v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') })
                }
                placeholder="María Gómez"
              />

              <Text style={styles.inputLabel}>Teléfono de contacto</Text>
              <TextInput
                style={styles.input}
                value={form.telefonoContacto}
                onChangeText={(v) =>
                  setForm({ ...form, telefonoContacto: v.replace(/[^0-9]/g, '').slice(0, 10) })
                }
                placeholder="3001234567"
                keyboardType="phone-pad"
                maxLength={10}
              />

              <Text style={styles.inputLabel}>Calle / dirección</Text>
              <TextInput
                style={styles.input}
                value={form.calle}
                onChangeText={(v) => setForm({ ...form, calle: v })}
                placeholder="Calle 123 # 45-67"
              />

              <Text style={styles.inputLabel}>Ciudad</Text>
              <TextInput
                style={styles.input}
                value={form.ciudad}
                onChangeText={(v) =>
                  setForm({ ...form, ciudad: v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') })
                }
                placeholder="Bogotá"
              />

              <TouchableOpacity
                style={[styles.saveAddressButton, savingDireccion && { opacity: 0.6 }]}
                onPress={guardarDireccion}
                disabled={savingDireccion}
              >
                {savingDireccion ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveAddressButtonText}>Guardar dirección</Text>
                )}
              </TouchableOpacity>
            </View>
          )}


          <Text style={styles.sectionTitle}>Método de pago</Text>

          <View style={styles.metodosRow}>
            {METODOS_PAGO.map((m) => (
              <TouchableOpacity
                key={m.valor}
                style={[
                  styles.metodoCard,
                  metodoPago === m.valor && styles.metodoCardSelected,
                ]}
                onPress={() => setMetodoPago(m.valor)}
              >
                <Ionicons
                  name={m.icon as any}
                  size={24}
                  color={metodoPago === m.valor ? '#7C3AED' : '#8B7898'}
                />
                <Text style={styles.metodoText}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {(metodoPago === 'NEQUI' || metodoPago === 'DAVIPLATA') && (
            <View style={styles.formCard}>
              <Text style={styles.inputLabel}>
                Envía el pago al número de {metodoPago === 'NEQUI' ? 'Nequi' : 'Daviplata'}
              </Text>
              <Text style={[styles.direccionTitle, { fontSize: 20 }]}>
                {NUMERO_PAGO_MOVIL}
              </Text>
            </View>
          )}


          <Text style={styles.sectionTitle}>Cupón de descuento (opcional)</Text>
          <TextInput
            style={styles.input}
            value={codigoCupon}
            onChangeText={setCodigoCupon}
            placeholder="Ej: BIENVENIDA10"
            autoCapitalize="characters"
          />


          <View style={styles.summary}>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Envío</Text>
              <Text style={styles.summaryValue}>
                {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
              </Text>
            </View>

            <Text style={[styles.summaryLabel, { fontSize: 11, marginTop: -4 }]}>
              El total final (con el cupón aplicado, si es válido) lo confirma el servidor.
            </Text>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total estimado</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, confirming && { opacity: 0.6 }]}
              onPress={handleConfirmar}
              disabled={confirming}
            >
              {confirming ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirmar compra</Text>
              )}
            </TouchableOpacity>

          </View>

        </ScrollView>
      )}

    </View>
  );
};

export default Checkout;
