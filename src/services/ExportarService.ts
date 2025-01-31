import { GastoTipo } from '../types/GastoTipo';

export function exportarCSV(data: GastoTipo[]) {
    const csvContent = data.map(item => `${item.id},${item.fecha},${item.monto},${item.categoria},${item.descripcion},${item.recurrente}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'gastos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportarPDF(data: GastoTipo[]) {
    const pdfContent = data.map(item => `${item.id} ${item.fecha} ${item.monto} ${item.categoria} ${item.descripcion} ${item.recurrente}`).join('\n');
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'gastos.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}