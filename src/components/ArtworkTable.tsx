
import React, { useState, useRef } from 'react';
import { DataTable, type DataTablePageEvent, type DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useArtworks } from '../hooks/useArtworks';
import type { Artwork } from '../types/artwork';

const ArtworkTable: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [rowSelectionCount, setRowSelectionCount] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const op = useRef<OverlayPanel>(null);

    const { artworks, pagination, loading, error } = useArtworks(page);

    // Create selection array for the current page from selectedIds
    const currentSelection = artworks.filter((artwork) => selectedIds.has(artwork.id));

    const onPageChange = (event: DataTablePageEvent) => {
        setPage((event.first / event.rows) + 1);
    };

    const onSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => {
        const newSelection = e.value;
        const currentIds = new Set(artworks.map(a => a.id));

        setSelectedIds(prev => {
            const next = new Set(prev);
            // Remove all IDs from the current page
            currentIds.forEach(id => next.delete(id));
            // Add back the IDs that are currently selected
            newSelection.forEach(artwork => next.add(artwork.id));
            return next;
        });
    };

    const handleCustomSelect = () => {
        if (rowSelectionCount && rowSelectionCount > 0) {
            const rowsToSelect = artworks.slice(0, rowSelectionCount);
            setSelectedIds(prev => {
                const next = new Set(prev);
                rowsToSelect.forEach(row => next.add(row.id));
                return next;
            });
            op.current?.hide();
        }
    };

    return (
        <div className="card shadow-8">
            {error && <div className="p-3 border-round bg-red-900 text-white font-bold mb-3">Error: {error}</div>}

            <div className="flex justify-content-between align-items-center mb-4 px-2">
                <div className="text-400 font-medium">
                    {pagination ? <span className="text-primary font-bold">{pagination.total.toLocaleString()}</span> : '...'} <span className="text-xs uppercase tracking-wider">Artworks Available</span>
                </div>
                <div className="flex align-items-center gap-2">
                    <Button
                        type="button"
                        icon="pi pi-chevron-down"
                        label="Bulk Select"
                        iconPos="right"
                        className="p-button-outlined p-button-secondary text-white border-white-alpha-20 hover:bg-white-alpha-10 transition-colors transition-duration-200"
                        onClick={(e) => op.current?.toggle(e)}
                    />
                    <OverlayPanel ref={op} className="surface-card border-round-xl shadow-6 border-none">
                        <div className="flex flex-column gap-3 w-20rem p-2">
                            <div className="flex align-items-center justify-content-between border-bottom-1 surface-border pb-2">
                                <span className="font-bold text-lg text-white">Select Rows</span>
                                <i className="pi pi-list text-primary" style={{ fontSize: '1.2rem' }}></i>
                            </div>
                            <small className="text-400">Enter quantity (Max: {artworks.length})</small>
                            <div className="flex align-items-center gap-2">
                                <InputNumber
                                    value={rowSelectionCount}
                                    onValueChange={(e) => setRowSelectionCount(e.value ?? null)}
                                    placeholder="Qty..."
                                    min={0}
                                    max={artworks.length}
                                    showButtons
                                    inputClassName="w-full surface-ground border-none text-white"
                                    className="flex-1"
                                />
                                <Button icon="pi pi-check" className="p-button-primary" onClick={handleCustomSelect} />
                            </div>
                        </div>
                    </OverlayPanel>
                </div>
            </div>

            <DataTable
                value={artworks}
                lazy
                paginator
                first={(page - 1) * 12}
                rows={12}
                totalRecords={pagination?.total}
                onPage={onPageChange}
                loading={loading}
                selection={currentSelection}
                onSelectionChange={onSelectionChange}
                dataKey="id"
                tableStyle={{ minWidth: '60rem' }}
                currentPageReportTemplate="{first} - {last} of {totalRecords}"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                rowsPerPageOptions={[12]}
                selectionMode="checkbox"
                className="p-datatable-sm"
                emptyMessage={<div className="text-center p-5 text-xl text-500">No artworks found</div>}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>

                <Column field="title" header="Make / Title" body={(rowData) => (
                    <div className="flex flex-column">
                        <span className="font-bold text-white text-lg">{rowData.title}</span>
                        <span className="text-sm text-400">{rowData.inscriptions || 'No inscriptions'}</span>
                    </div>
                )}></Column>

                <Column field="artist_display" header="Artist" body={(rowData) => (
                    <span className="text-primary font-medium">{rowData.artist_display}</span>
                )}></Column>

                <Column field="place_of_origin" header="Origin" body={(rowData) => (
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-map-marker text-500 text-xs"></i>
                        <span className="text-300">{rowData.place_of_origin}</span>
                    </div>
                )}></Column>

                <Column field="date_start" header="Era" body={(rowData) => (
                    <span className="surface-ground px-3 py-1 border-round-2xl text-xs font-bold text-300 border-1 surface-border">
                        {rowData.date_start} - {rowData.date_end}
                    </span>
                )} style={{ width: '150px' }}></Column>
            </DataTable>
        </div>
    );
}

export default ArtworkTable;
