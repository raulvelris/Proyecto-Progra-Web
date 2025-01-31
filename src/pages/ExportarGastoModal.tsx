import React, { useState } from 'react';

interface ExportarGastoModalProps {
    closeModal: () => void;
    onExport: (format: 'csv' | 'pdf') => void;
}

const ExportarGastoModal: React.FC<ExportarGastoModalProps> = ({ closeModal, onExport }) => {
    const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf'>('csv');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFormat(e.target.value as 'csv' | 'pdf');
    };

    const handleExport = () => {
        onExport(selectedFormat);
    };

    return (
        <div className="modal fade show d-flex align-items-center justify-content-center"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }} aria-modal="true" role="dialog">
            <div className="modal-dialog" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center w-100">
                        <h4 className="modal-title">Exportar Gasto</h4>
                    </div>
                    <div className="modal-body text-center">
                        <p>Selecciona el formato de exportación:</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="exportFormat"
                                id="exportCsv"
                                value="csv"
                                checked={selectedFormat === 'csv'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="exportCsv">
                                CSV
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="exportFormat"
                                id="exportPdf"
                                value="pdf"
                                checked={selectedFormat === 'pdf'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="exportPdf">
                                PDF
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary mx-3" onClick={closeModal}>Cancelar</button>
                        <button type="button" className="btn btn-primary mx-3" onClick={handleExport}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportarGastoModal;