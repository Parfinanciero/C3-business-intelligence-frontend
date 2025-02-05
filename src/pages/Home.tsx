import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import BalanceChartCircle from "../components/expensesAndIncomes/BalanceChartCircle";
import BalanceChartBar from "../components/expensesAndIncomes/BalanceChartBar";
import SimpleBalanceCard from "../components/expensesAndIncomes/BalanceSheetCard";

interface ExpenseData {
  totalExpenses: number;
}

interface IncomeData {
  totalExpenses: number;
}

const Home: React.FC = () => {
  const [expenseData, setExpenseData] = useState<ExpenseData | null>(null);
  const [incomeData, setIncomeData] = useState<IncomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const calculateBalance = (): string | null => {
    if (incomeData && expenseData) {
      const balance = incomeData.totalExpenses - expenseData.totalExpenses;
      return balance.toFixed(2); // Convertir a formato de dos decimales
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const expenseResponse = await fetch("http://23.88.104.53:8047/api/finanzas/gastos/1/01");
        if (!expenseResponse.ok) throw new Error(`Error al obtener los gastos: ${expenseResponse.status}`);
        const expenseData: ExpenseData = await expenseResponse.json();
        setExpenseData(expenseData);

        const incomeResponse = await fetch("http://23.88.104.53:8047/api/finanzas/ingresos/1/01");
        if (!incomeResponse.ok) throw new Error(`Error al obtener los ingresos: ${incomeResponse.status}`);
        const incomeData: IncomeData = await incomeResponse.json();
        setIncomeData(incomeData);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Parfinanciero" />
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1>Bienvenido a Parfinanciero</h1>
        
        {expenseData ? (
          <div>
            <h2>Total de Gastos: ${expenseData.totalExpenses.toFixed(2)}</h2>
          </div>
        ) : (
          <p>No hay datos disponibles.</p>
        )}

        {incomeData ? (
          <div>
            <h2>Total de Ingresos: ${incomeData.totalExpenses.toFixed(2)}</h2>
          </div>
        ) : (
          <p>No hay datos de ingresos disponibles.</p>
        )}

        {/* Renderizado del Balance General Calculado */}
        {calculateBalance() !== null && (
          <SimpleBalanceCard balanceSheet={`${calculateBalance()}`} />
        )}
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {incomeData && expenseData && (
          <>
            <BalanceChartCircle income={incomeData.totalExpenses} expense={expenseData.totalExpenses} />
            <BalanceChartBar income={incomeData.totalExpenses} expense={expenseData.totalExpenses} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
