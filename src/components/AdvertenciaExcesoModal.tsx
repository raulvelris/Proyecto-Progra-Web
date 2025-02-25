import React, { useEffect, useState } from "react";
import { Button, Card, CardContent } from "@/components/ui";

interface AdvertenciaExcesoModalProps {
  categoryName: string;
  currentAmount: number;
  monthlyBudget: number;
  closeModal: () => void;
}

const AdvertenciaExcesoModal: React.FC<AdvertenciaExcesoModalProps> = ({ categoryName, currentAmount, monthlyBudget, closeModal }) => {
  const percentage = ((currentAmount / monthlyBudget) * 100).toFixed(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-96 p-6 rounded-2xl shadow-lg bg-white">
        <CardContent className="text-center">
          <h2 className="text-xl font-bold mb-4">¡Advertencia de Presupuesto!</h2>
          <p className="mb-4">
            Has alcanzado el <strong>{percentage}%</strong> del presupuesto mensual asignado para la categoría <strong>{categoryName}</strong>.
          </p>
          <Button onClick={closeModal} className="w-full bg-red-500 text-white hover:bg-red-600">
            Entendido
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvertenciaExcesoModal;
