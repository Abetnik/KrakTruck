import React from "react";
import styles from "./AdminItemList.module.css";

const AdminItemList = ({ items, onEdit, onDelete }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Lista ogłoszeń</h2>

        {items.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tytuł</th>
                <th>Kategoria</th>
                <th>Rok</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.titlePl || item.titleEn || item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.year}</td>
                  <td>{item.status.toUpperCase()}</td>
                  <td className={styles.actions}>
                    <button onClick={() => onEdit(item)}>Edytuj</button>
                    <button onClick={() => onDelete(item.id)}>Usuń</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.empty}>Brak pozycji dla wybranego typu.</p>
        )}
      </div>
    </section>
  );
};

export default AdminItemList;
