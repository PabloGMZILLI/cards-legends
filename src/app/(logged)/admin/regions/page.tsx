'use client';

import { useEffect, useState } from 'react';
import styles from './RegionPage.module.css';
import { Region } from '@/types/RoomTypes';
import { Button, Spinner, DataTable } from '@/components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegionsPage() {
    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const fetchRegions = async () => {
        try {
            const data = await fetch('/api/regions').then((res) => res.json());
            setRegions(data);
        } catch (err) {
            console.error('Erro ao carregar regiões:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (region: Region) => {
        alert(`Editar região: ${region.name}`);
        // TODO: abrir modal ou redirecionar para tela de edição
    };

    const handleDelete = async (region: Region) => {
        const confirm = window.confirm(`Tem certeza que deseja deletar a região "${region.name}"?`);
        if (!confirm) return;

        try {
            await fetch(`/api/regions/${region.id}`, {
                method: 'DELETE',
            });

            // Atualiza a lista
            setRegions((prev) => prev.filter((r) => r.id !== region.id));
        } catch (err) {
            console.error('Erro ao deletar região:', err);
            alert('Erro ao deletar.');
        }
    };

    useEffect(() => {
        fetchRegions();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Regiões</h1>
                <Button onClick={() => router.push('/admin/regions/create')}>
                    Adicionar Nova Região
                </Button>
            </div>

            {loading ? (
                <Spinner center />
            ) : regions.length === 0 ? (
                <p>Nenhuma região cadastrada.</p>
            ) : (
                <DataTable
                    data={regions}
                    withActions
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    columns={[
                        {
                            key: 'icon',
                            label: 'Ícone',
                            render: (region) =>
                                region.icon ? (
                                    <Image src={region.icon} alt="ícone" width={32} height={32} />
                                ) : (
                                    '-'
                                ),
                        },
                        { key: 'name', label: 'Nome' },
                    ]}
                />
            )}
        </div>
    );
}
