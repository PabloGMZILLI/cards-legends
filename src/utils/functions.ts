export const formatTimestamp = (ts: any) => {
    if (!ts?.seconds) return '-';
    return new Date(ts.seconds * 1000).toLocaleDateString('pt-BR');
  };