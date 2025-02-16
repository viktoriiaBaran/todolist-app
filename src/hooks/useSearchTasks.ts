import { Task } from '@redux/types';
import { useEffect, useState } from 'react';

const useSearchTasks = ({
  taskList,
  completeStatus,
  category,
}: {
  taskList: { [date: string]: Task[] };
  completeStatus: string[];
  category: string[];
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredTasksByDate, setFilteredTasksByDate] = useState<{
    [date: string]: Task[];
  }>({});

  useEffect(() => {
    if (!taskList) {
      setFilteredTasksByDate({});
      return;
    }

    const filteredTasks: { [date: string]: Task[] } = {};

    Object.entries(taskList).forEach(([date, tasks]) => {
      const matchingTasks = tasks.filter((task) => {
        // Search filter
        const matchesSearch =
          searchValue === '' ||
          task.taskTitle.toLowerCase().includes(searchValue.toLowerCase());

        // Status filter
        const matchesStatus =
          completeStatus.length === 0 ||
          (completeStatus.includes('done') && task.isChecked) ||
          (completeStatus.includes('undone') && !task.isChecked);

        // Category filter
        const matchesCategory =
          category.length === 0 || category.includes(task.category);

        return matchesSearch && matchesStatus && matchesCategory;
      });

      if (matchingTasks.length > 0) {
        filteredTasks[date] = matchingTasks;
      }
    });

    setFilteredTasksByDate(filteredTasks);
  }, [searchValue, taskList, completeStatus, category]);

  return {
    searchValue,
    setSearchValue,
    isSearchVisible,
    setIsSearchVisible,
    filteredTasks: filteredTasksByDate,
  };
};

export default useSearchTasks;
