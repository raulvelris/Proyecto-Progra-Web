import React, { useState } from 'react';
import { exportarCSV, exportarPDF } from '../services/ExportarService';
import { GastoTipo } from '../types/GastoTipo';

interface ExportarGastoModalProps {
    closeModal: () => void;
    onExport: (format: 'csv' | 'pdf') => void;
    data: GastoTipo[];
}

const ExportarGastoModal: React.FC<ExportarGastoModalProps> = ({ closeModal, onExport, data }) => {
    const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf'>('csv');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFormat(e.target.value as 'csv' | 'pdf');
    };

    const handleExport = () => {
        if (selectedFormat === 'csv') {
            exportarCSV(data);
        } else {
            exportarPDF(data);
        }
        onExport(selectedFormat);
    };

    return (
        <div className="modal fade show d-flex align-items-center justify-content-center"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }}
            aria-modal="true" role="dialog">
            
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="modal-content shadow-lg rounded-3">
                    
                    {/* Encabezado */}
                    <div className="modal-header bg-primary text-white text-center">
                        <h5 className="modal-title w-100">Exportar Gasto</h5>
                    </div>

                    {/* Cuerpo */}
                    <div className="modal-body text-center">
                        <p className="mb-3">Selecciona el formato de exportación:</p>

                        <div className="d-flex flex-column align-items-start px-4">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="radio" name="exportFormat"
                                    id="exportCsv" value="csv" checked={selectedFormat === 'csv'} onChange={handleChange} />
                                <label className="form-check-label ms-2" htmlFor="exportCsv">
                                    CSV
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exportFormat"
                                    id="exportPdf" value="pdf" checked={selectedFormat === 'pdf'} onChange={handleChange} />
                                <label className="form-check-label ms-2" htmlFor="exportPdf">
                                    PDF
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Pie del Modal */}
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={closeModal}>Cancelar</button>
                        <button type="button" className="btn btn-primary px-4" onClick={handleExport}>Aceptar</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ExportarGastoModal;
