import { useEffect } from 'react'; 
import './SpecialtiesPage.css'; // Здесь мы подключаем файл стилей

// Интерфейсы для описания записей каждого раздела
interface GRNTISpecialty {
  code: string;
  title: string;
}

interface OECDSpecialty {
  code: string;
  title: string;
}

interface VAKSpecialty {
  code: string;
  title: string;
}

interface SubSpecialty {
  code: string;
  title: string;
}

// Данные для каждого раздела
const grntiSpecialties: GRNTISpecialty[] = [
  { code: '520000.', title: 'Горное дело' },
  { code: '733900.', title: 'Транспорт / Трубопроводный транспорт' },
  { code: '733931.', title: 'Транспорт / Трубопроводный транспорт / Трубопроводы' },
  { code: '733935.', title: 'Трубопроводный транспорт / Детали и элементы трубопроводов' },
  // Добавьте другие записи
];

const oecdSpecialties: OECDSpecialty[] = [
  { code: '105.', title: 'Earth and related environmental sciences' }, // Примеры данных для OECD
  { code: '203.', title: 'Mechanical engineering' },
  { code: '207.', title: 'Environmental engineering' },
];

const vakSpecialties: VAKSpecialty[] = [
  { code: '02.08.05', title: 'Строительство и эксплуатация нефтегазопроводов, баз и хранилищ' },
  { code: '03.02.06', title: 'Безопасность в чрезвычайных ситуациях' },
  { code: '02.10.00', title: 'Техносферная безопасность' },
  { code: '01.06.00', title: 'Науки о Земле и окружающей среде' },
  // Добавьте остальные специальности
];

const SubSpecialties: SubSpecialty[] = [
  { code: '02.08.05', title: 'Системный анализ, моделирование и управление эффективностью технологических процессов в системах транспорта и хранения углеводородов' },
  { code: '03.02.06', title: 'Технологии машиностроения и материаловедение в нефтегазовом деле и отраслях промышленности' },
  { code: '02.10.00', title: 'Цифровизация и робототехнические системы при обеспечении надежности, безопасности объектов нефтегазового комплекса' },
  // Добавьте остальные специальности
];

// Компоненты для отображения блоков
const GRNTIBlock = () => (
  <section className="block">
    <h2>Разделы тематического рубрикатора ГРНТИ</h2>
    <ul>
      {grntiSpecialties.map((item) => (
        <li key={item.code}>
          <strong>{item.code}</strong>{item.title}
        </li>
      ))}
    </ul>
  </section>
);

const OECSBlock = () => (
  <section className="block">
    <h2>Разделы тематического рубрикатора OECD</h2>
    <ul>
      {oecdSpecialties.map((item) => (
        <li key={item.code}>
          <strong>{item.code}</strong>{item.title}
        </li>
      ))}
    </ul>
  </section>
);

const VAKBlock = () => (
  <section className="block">
    <h2>Разделы номенклатуры специальностей ВАК</h2>
    <ul>
      {vakSpecialties.map((item) => (
        <li key={item.code}>
          <strong>{item.code}</strong>{item.title}
        </li>
      ))}
    </ul>
  </section>
);

const SubSpecialtyBlock = () => (
  <section className="SubSpecialtyBlock">
    <h2>Дополнительные рубрики</h2>
    <ul>
      {SubSpecialties.map((item) => (
        <li key={item.code}>
          {item.title}
        </li>
      ))}
    </ul>
  </section>
);

// Основной компонент, объединяющий все блоки
const SpecialtiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокручиваем страницу до верхней позиции
  }, []);
   return (
  <div className="page-container">
    <VAKBlock />
    <GRNTIBlock />
    <OECSBlock />
    <SubSpecialtyBlock />
  </div>
  );
};

export default SpecialtiesPage;
