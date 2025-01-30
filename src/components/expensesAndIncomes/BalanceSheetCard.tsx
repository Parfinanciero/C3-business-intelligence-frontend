import React from "react";

interface SimpleBalanceCardProps {
  balanceSheet: string;
}

const SimpleBalanceCard: React.FC<SimpleBalanceCardProps> = ({ balanceSheet }) => {
  const isPositive = !balanceSheet.startsWith("-");

  const containerStyle = {
    backgroundColor: "#1E293B",
    padding: "24px",
    borderRadius: "12px",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center" as const,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    color: "#E2E8F0",
    marginBottom: "8px",
    fontWeight: "bold" as const,
  };

  const balanceStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: isPositive ? "#4CAF50" : "#E53935",
  };

  const iconContainerStyle = {
    marginTop: "10px",
  };

  const iconStyle = {
    width: "40px",
    height: "40px",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Balance General</h3>
      <span style={balanceStyle}>
        {balanceSheet}
      </span>
      <div style={iconContainerStyle}>
        {isPositive ? (
          <svg
            style={iconStyle}
            xmlns="http://www.w3.org/2000/svg"
            fill="#4CAF50"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l5 9h-4v11h-2v-11h-4z" />
          </svg>
        ) : (
          <svg
            style={iconStyle}
            xmlns="http://www.w3.org/2000/svg"
            fill="#E53935"
            viewBox="0 0 24 24"
          >
            <path d="M12 22l-5-9h4v-11h2v11h4z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default SimpleBalanceCard;
