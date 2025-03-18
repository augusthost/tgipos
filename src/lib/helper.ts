export const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'border-blue-500';
      case 'in-kitchen':
        return 'border-yellow-500';
      case 'ready':
        return 'border-green-500';
      case 'completed':
        return '!bg-gray-800 text-white';
      default:
        return 'border-gray-100';
    }
  }