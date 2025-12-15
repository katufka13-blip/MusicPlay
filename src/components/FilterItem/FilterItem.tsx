import classNames from 'classnames';
import styles from './filterItem.module.css';

interface FilterItemProps {
  items: string[];
  onSelectItem: (item: string) => void;
  activeItem?: string | string[];
}

export default function FilterItem({
  items,
  onSelectItem,
  activeItem,
}: FilterItemProps) {
  const handleItemClick = (item: string) => {
    onSelectItem(item);
  };

  const isItemSelected = (item: string): boolean => {
    if (Array.isArray(activeItem)) {
      return activeItem.includes(item);
    }
    return activeItem === item;
  };
  return (
    <div className={styles.modal_conteiner}>
      <ul className={styles.modal_block} onClick={(e) => e.stopPropagation()}>
        {items.map((item) => (
          <li
            key={item}
            onClick={() => handleItemClick(item)}
            className={classNames(styles.title_modal, {
              [styles.active]: isItemSelected(item),
            })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
