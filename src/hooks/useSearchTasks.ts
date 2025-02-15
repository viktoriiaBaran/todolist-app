import { Task } from '@redux/types';
import { useEffect, useState } from 'react';

const useSearchTasks = ({ taskList }: { taskList: Task[] }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(taskList);
  const [displayedTasks, setDisplayedTasks] = useState<{
    todoList: Task[];
    completedList: Task[];
  }>({
    todoList: [],
    completedList: [],
  });

  // Filter tasks based on search value
  useEffect(() => {
    if (isSearchVisible && searchValue) {
      const filtered = taskList.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(taskList);
    }
  }, [searchValue, taskList, isSearchVisible]);

  // Update displayed tasks based on filtered results
  useEffect(() => {
    const tasks = filteredTasks.map((item) => ({
      ...item,
      time: item.time ?? undefined,
    }));

    setDisplayedTasks({
      todoList: tasks.filter((item) => !item.isChecked),
      completedList: tasks.filter((item) => item.isChecked),
    });
  }, [filteredTasks]);

  return {
    searchValue,
    setSearchValue,
    isSearchVisible,
    setIsSearchVisible,
    filteredTasks,
    displayedTasks,
  };
};

export default useSearchTasks;
