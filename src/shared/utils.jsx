
export const formatAmount = (amount)=>{
    return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 });
};

