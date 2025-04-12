import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const generateAdminPassword = async () => {
  const password = 'admin123'; // Пароль для администратора
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const usersPath = path.join(__dirname, '../data/users.json');
  const usersData = fs.readFileSync(usersPath, 'utf8');
  const users = JSON.parse(usersData);
  
  // Обновляем пароль администратора
  const adminUser = users.find((user: any) => user.role === 'admin');
  if (adminUser) {
    adminUser.password = hashedPassword;
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    console.log('Пароль администратора успешно обновлен');
  } else {
    console.log('Администратор не найден');
  }
};

generateAdminPassword().catch(console.error); 