
function AmountStats({ lucroPrevisto }) {
    const formatCurrency = (value) => {
        if (value === null || value === undefined) return 'R$ 0,00';
        return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
    };

    const lucroColorClass = lucroPrevisto >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">Lucro Previsto</div>
                <div className={`stat-value ${lucroColorClass}`}>{formatCurrency(lucroPrevisto)}</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">Detalhes</button>
                </div>
            </div>
        </div>
    );
}

export default AmountStats;