import { useMemo, useState } from 'react';

const useVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVacancies = useMemo(() => {
    if (!searchTerm.trim()) {
      return vacancies;
    }
    const normalized = searchTerm.trim().toLowerCase();
    return vacancies.filter((vacancy) => {
      return (
        vacancy.title.toLowerCase().includes(normalized) ||
        vacancy.department.toLowerCase().includes(normalized)
      );
    });
  }, [searchTerm, vacancies]);

  const togglePublication = (vacancyId) => {
    setVacancies((prev) =>
      prev.map((vacancy) =>
        vacancy.id === vacancyId ? { ...vacancy, published: !vacancy.published } : vacancy,
      ),
    );
  };

  return {
    vacancies: filteredVacancies,
    searchTerm,
    setSearchTerm,
    togglePublication,
    totalVacancies: vacancies.length,
  };
};

export default useVacancies;