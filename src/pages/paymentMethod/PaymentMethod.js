import React from "react";
import { AddNewPaymentMethodForm } from "../../components/paymentMethods-forms/AddNewPaymentMethodForm";
import { PaymentMethodTable } from "../../components/paymentMethods-forms/PaymentMethodTable";
import { AdminLayout } from "../layout/AdminLayout";

export const PaymentMethods = () => {
  return (
    <AdminLayout>
      <div className="mt-3">
        <h3>Add Payment Methods</h3>
        <hr />
        <AddNewPaymentMethodForm />
      </div>
      <div>
        <PaymentMethodTable />
      </div>
    </AdminLayout>
  );
};
