import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import BalanceChartCircle from "../components/expensesAndIncomes/BalanceChartCircle";
import BalanceChartBar from "../components/expensesAndIncomes/BalanceChartBar";

const Home = () => {
  const [expenseData, setExpenseData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoading(true);

        const expenseResponse = await fetch("http://localhost:8081/api/finanzas/gastos/1/02");
        if (!expenseResponse.ok) {
          throw new Error(`Error al obtener los datos: ${response.status}`);
        }
        const expenseData = await expenseResponse.json();
        setExpenseData(expenseData);

        const incomeResponse = await fetch("http://localhost:8081/api/finanzas/ingresos/1/02");
        if (!incomeResponse.ok) {
          throw new Error(`Error al obtener los datos de ingresos: ${incomeResponse.status}`);
        }
        const incomeData = await incomeResponse.json();
        setIncomeData(incomeData);
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetchExpense();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Expenses And Incomes"/>
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0}}
        transition={{ delay: 0.3 }}
      >
        <h1>Bienvenido a la página de Gastos e Ingresos</h1>
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
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <BalanceChartCircle income={incomeData.totalExpenses} expense={expenseData.totalExpenses}/>
        <BalanceChartBar income={incomeData.totalExpenses} expense={expenseData.totalExpenses}/>
      </div>
    </div>
  );
}

export default Home
