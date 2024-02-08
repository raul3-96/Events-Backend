'use strict'
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {})
    */

    await queryInterface.bulkInsert('Users',
      [
        { id:1,firstName: 'Maria Ines', lastName: 'Garcia', password: bcrypt.hashSync('BH66NaSm', salt), phone: '652257648', userType: 'guest' },
{ id:2,firstName: 'Pablo', lastName: 'Romero', password: bcrypt.hashSync('UKfSuEw8', salt), phone: '654224288', userType: 'guest' },
{ id:3,firstName: 'Rocio', lastName: 'Ruiz', password: bcrypt.hashSync('UoJByveq', salt), phone: '630919130', userType: 'guest' },
{ id:4,firstName: 'Paqui', lastName: 'Garcia', password: bcrypt.hashSync('ha99b8ZE', salt), phone: '690323005', userType: 'guest' },
{ id:5,firstName: 'Saray', lastName: '', password: bcrypt.hashSync('yEehaimC', salt), phone: '618131561', userType: 'guest' },
{ id:6,firstName: 'Luis', lastName: '', password: bcrypt.hashSync('MwY7pm5p', salt), userType: 'guest' },
{ id:7,firstName: 'Luis', lastName: '', password: bcrypt.hashSync('fUqepg73', salt), userType: 'guest' },
{ id:8,firstName: 'Maria', lastName: 'Hidalgo', password: bcrypt.hashSync('JyDWoN58', salt), phone: '627618562', userType: 'guest' },
{ id:9,firstName: 'Idalino', lastName: '', password: bcrypt.hashSync('vsEZP4cH', salt), userType: 'guest' },
{ id:10,firstName: 'Meli', lastName: '', password: bcrypt.hashSync('JvP9dPCW', salt), phone: '651403460', userType: 'guest' },
{ id:11,firstName: 'Paco', lastName: 'Monge', password: bcrypt.hashSync('p3doy4rz', salt), userType: 'guest' },
{ id:12,firstName: 'Angel', lastName: 'Monge', password: bcrypt.hashSync('MMmtbRs4', salt), phone: '605981769', userType: 'guest' },
{ id:13,firstName: 'Paquito', lastName: 'Monge', password: bcrypt.hashSync('8mvpmq8J', salt), phone: '645421900', userType: 'guest' },
{ id:14,firstName: 'Novia paquito', lastName: '', password: bcrypt.hashSync('bEigd8ip', salt), userType: 'guest' },
{ id:15,firstName: 'Maria del Mar', lastName: '', password: bcrypt.hashSync('RhLoxb9X', salt), phone: '646432931', userType: 'guest' },
{ id:16,firstName: 'Miguel', lastName: '', password: bcrypt.hashSync('W4KCwev5', salt), userType: 'guest' },
{ id:17,firstName: 'Angelika', lastName: '', password: bcrypt.hashSync('zB4xVUsC', salt), phone: '634758108', userType: 'guest' },
{ id:18,firstName: 'Fernando', lastName: '', password: bcrypt.hashSync('ooRPaD8J', salt), userType: 'guest' },
{ id:19,firstName: 'Lara', lastName: '', password: bcrypt.hashSync('WRP3wizS', salt), userType: 'guest' },
{ id:20,firstName: 'Manuel', lastName: '', password: bcrypt.hashSync('8iYnfLef', salt), phone: '665268641', userType: 'guest' },
{ id:21,firstName: 'Cristina', lastName: '', password: bcrypt.hashSync('GnP7L43r', salt), userType: 'guest' },
{ id:22,firstName: 'niño1', lastName: '', password: bcrypt.hashSync('MxjHmEcY', salt), userType: 'guest' },
{ id:23,firstName: 'niño2', lastName: '', password: bcrypt.hashSync('CPzPA4dH', salt), userType: 'guest' },
{ id:24,firstName: 'niño3', lastName: '', password: bcrypt.hashSync('UKJrRhRW', salt), userType: 'guest' },
{ id:25,firstName: 'Francisco', lastName: '', password: bcrypt.hashSync('3N9QZEyX', salt), phone: '600766106', userType: 'guest' },
{ id:26,firstName: 'Rita', lastName: '', password: bcrypt.hashSync('JUAVrmzJ', salt), userType: 'guest' },
{ id:27,firstName: 'Soledad', lastName: '', password: bcrypt.hashSync('abLz7thN', salt), userType: 'guest' },
{ id:28,firstName: 'Jesus', lastName: '', password: bcrypt.hashSync('sXwGYCds', salt), phone: '669888134', userType: 'guest' },
{ id:29,firstName: 'Jesus', lastName: 'Ruiz', password: bcrypt.hashSync('hehRp9pu', salt), userType: 'guest' },
{ id:30,firstName: 'Ana Belen', lastName: '', password: bcrypt.hashSync('qPHd8dcM', salt), userType: 'guest' },
{ id:31,firstName: 'Fabiola', lastName: '', password: bcrypt.hashSync('WNJ4Vpfd', salt), userType: 'guest' },
{ id:32,firstName: 'Paco', lastName: '', password: bcrypt.hashSync('QgAJAoU8', salt), userType: 'guest' },
{ id:33,firstName: 'Jesús', lastName: 'Reyes', password: bcrypt.hashSync('4sytbrqz', salt), phone: '665798991', userType: 'guest' },
{ id:34,firstName: 'Alvaro', lastName: 'Reyes', password: bcrypt.hashSync('F73bEgXA', salt), phone: '665272323', userType: 'guest' },
{ id:35,firstName: 'Abraham', lastName: 'Hernandez', password: bcrypt.hashSync('pFr3nL46', salt), phone: '699782734', userType: 'guest' },
{ id:36,firstName: 'Cristina', lastName: '', password: bcrypt.hashSync('WbwFrBa5', salt), phone: '663400861', userType: 'guest' },
{ id:37,firstName: 'Ignacio', lastName: 'Santiesteban', password: bcrypt.hashSync('kYZmUp3X', salt), phone: '662504635', userType: 'guest' },
{ id:38,firstName: 'Irene', lastName: '', password: bcrypt.hashSync('K7HYg2ab', salt), userType: 'guest' },
{ id:39,firstName: 'David', lastName: 'Gomez', password: bcrypt.hashSync('aKwaPLyh', salt), phone: '664073441', userType: 'guest' },
{ id:40,firstName: 'Novia David', lastName: '', password: bcrypt.hashSync('6kktmiX9', salt), userType: 'guest' },
{ id:41,firstName: 'Leonardo', lastName: '', password: bcrypt.hashSync('8f78XuaS', salt), phone: '677861446', userType: 'guest' },
{ id:42,firstName: 'Novia Leo', lastName: '', password: bcrypt.hashSync('QMNJLAHe', salt), userType: 'guest' },
{ id:43,firstName: 'Abaham', lastName: 'Gutierrez', password: bcrypt.hashSync('wQxmNvvs', salt), phone: '627070687', userType: 'guest' },
{ id:44,firstName: 'Belen', lastName: '', password: bcrypt.hashSync('5BBmt5gz', salt), phone: '656761093', userType: 'guest' },
{ id:45,firstName: 'Adrian', lastName: '', password: bcrypt.hashSync('iuYyJYY3', salt), userType: 'guest' },
{ id:46,firstName: 'Jesus', lastName: '', password: bcrypt.hashSync('Xomgp4aj', salt), phone: '673217703', userType: 'guest' },
{ id:47,firstName: 'Elena', lastName: '', password: bcrypt.hashSync('azru8fyk', salt), userType: 'guest' },
{ id:48,firstName: 'Manuel', lastName: 'Zafra', password: bcrypt.hashSync('CUcyUvBV', salt), userType: 'guest' },
{ id:49,firstName: 'novia Manuel', lastName: '', password: bcrypt.hashSync('2TtfmBfn', salt), userType: 'guest' },
{ id:50,firstName: 'Rafa', lastName: 'Haro', password: bcrypt.hashSync('cghfT9Xg', salt), phone: '651656395', userType: 'guest' },
{ id:51,firstName: 'Manuel', lastName: 'Luna', password: bcrypt.hashSync('tAKb4fVZ', salt), phone: '695062584', userType: 'guest' },
{ id:52,firstName: 'Carlos Bordos', lastName: '', password: bcrypt.hashSync('xWYHvfAV', salt), phone: '654854346', userType: 'guest' },
{ id:53,firstName: 'Carlos Cutiño', lastName: '', password: bcrypt.hashSync('27UbjPgd', salt), phone: '651696307', userType: 'guest' },
{ id:54,firstName: 'Antonio Puche', lastName: '', password: bcrypt.hashSync('s4wcy4gu', salt), phone: '615977528', userType: 'guest' },
{ id:55,firstName: 'Lourdes', lastName: '', password: bcrypt.hashSync('gs6SpGFr', salt), phone: '666054515', userType: 'guest' },
{ id:56,firstName: 'Jose Manuel', lastName: '', password: bcrypt.hashSync('bYpkqZ8Y', salt), userType: 'guest' },
{ id:57,firstName: 'Jose David', lastName: 'Rodriguez', password: bcrypt.hashSync('WDHRbk3f', salt), phone: '654719225', userType: 'guest' },
{ id:58,firstName: 'Maria Dolores', lastName: '', password: bcrypt.hashSync('XnbdRPbT', salt), userType: 'guest' },
{ id:59,firstName: 'Laura', lastName: '', password: bcrypt.hashSync('2TMasvyJ', salt), phone: '625891609', userType: 'guest' },
{ id:60,firstName: 'Javi', lastName: '', password: bcrypt.hashSync('D678ktVt', salt), phone: '665887297', userType: 'guest' },
{ id:61,firstName: 'Bastida', lastName: '', password: bcrypt.hashSync('Xowt2qjQ', salt), phone: '628237710', userType: 'guest' },
{ id:62,firstName: 'Alejandro', lastName: 'Bernal', password: bcrypt.hashSync('NyPYDyxk', salt), phone: '664662777', userType: 'guest' },
{ id:63,firstName: 'Antonio Manuel', lastName: '', password: bcrypt.hashSync('wmNPVTxX', salt), phone: '663133890', userType: 'guest' },
{ id:64,firstName: 'Novia Antonio', lastName: '', password: bcrypt.hashSync('Gx2xo869', salt), userType: 'guest' },
{ id:65,firstName: 'Macarena', lastName: '', password: bcrypt.hashSync('5fX9f5kL', salt), phone: '695191506', userType: 'guest' },
{ id:66,firstName: 'Francisco', lastName: 'Palomo', password: bcrypt.hashSync('2HZMpcow', salt), phone: '679152457', userType: 'guest' },
{ id:67,firstName: 'Camen', lastName: 'Naranjo', password: bcrypt.hashSync('JvdpoeMY', salt), phone: '635893363', userType: 'guest' },
{ id:68,firstName: 'Carmen', lastName: 'Estevez', password: bcrypt.hashSync('NZxmR5Ep', salt), phone: '676445786', userType: 'guest' },
{ id:69,firstName: 'Rafael', lastName: 'Avecilla', password: bcrypt.hashSync('ggDBWpDZ', salt), phone: '652405568', userType: 'guest' },
{ id:70,firstName: 'Jose Antonio', lastName: 'Gomez', password: bcrypt.hashSync('ZtYoz68S', salt), phone: '626422142', userType: 'guest' },
{ id:71,firstName: 'Paula', lastName: 'Gomez', password: bcrypt.hashSync('X9q7pdfw', salt), phone: '694460670', userType: 'guest' },
{ id:72,firstName: 'Francisco', lastName: 'Estevez', password: bcrypt.hashSync('ct79wJvL', salt), phone: '605778582', userType: 'guest' },
{ id:73,firstName: 'Novia Francisco', lastName: '', password: bcrypt.hashSync('CobihZP7', salt), userType: 'guest' },
{ id:74,firstName: 'Valme', lastName: '', password: bcrypt.hashSync('3MMHki9v', salt), phone: '635205526', userType: 'guest' },
{ id:75,firstName: 'Novio Valm', lastName: '', password: bcrypt.hashSync('jRG7QS8k', salt), userType: 'guest' },
{ id:76,firstName: 'Pedro', lastName: '', password: bcrypt.hashSync('Zv98DXxJ', salt), userType: 'guest' },
{ id:77,firstName: 'Mujer Pedro', lastName: '', password: bcrypt.hashSync('exNt25Xd', salt), userType: 'guest' },
{ id:78,firstName: 'Pilar', lastName: '', password: bcrypt.hashSync('PBv2asSv', salt), userType: 'guest' },
{ id:79,firstName: 'Marido Pilar', lastName: '', password: bcrypt.hashSync('r9yXbnGQ', salt), userType: 'guest' },
{ id:80,firstName: 'Montaña', lastName: '', password: bcrypt.hashSync('KN4a6trq', salt), userType: 'guest' },
{ id:81,firstName: 'Hija montaña', lastName: '', password: bcrypt.hashSync('i5wfKytV', salt), userType: 'guest' },
{ id:82,firstName: 'Susana', lastName: '', password: bcrypt.hashSync('T8ArXpsQ', salt), userType: 'guest' },
{ id:83,firstName: 'Novio Susana', lastName: '', password: bcrypt.hashSync('VJZ7k3ru', salt), userType: 'guest' },
{ id:84,firstName: 'Maribel', lastName: '', password: bcrypt.hashSync('WtvNiAoJ', salt), userType: 'guest' },
{ id:85,firstName: 'Miriam', lastName: '', password: bcrypt.hashSync('tbBiGiqN', salt), userType: 'guest' },
{ id:86,firstName: 'Joni', lastName: '', password: bcrypt.hashSync('t7eymGPc', salt), userType: 'guest' },
{ id:87,firstName: 'Dolores', lastName: '', password: bcrypt.hashSync('8QdGFtpH', salt), userType: 'guest' },
{ id:88,firstName: 'Antonio', lastName: 'Gomez', password: bcrypt.hashSync('dNjmBv7p', salt), userType: 'guest' },
{ id:89,firstName: 'Javier', lastName: 'Gomez', password: bcrypt.hashSync('D8tMfsw4', salt), userType: 'guest' },
{ id:90,firstName: 'Maria Dolores', lastName: 'Gomez', password: bcrypt.hashSync('yRisW6VM', salt), userType: 'guest' },
{ id:91,firstName: 'Marta', lastName: '', password: bcrypt.hashSync('3npzr8rx', salt), userType: 'guest' },
{ id:92,firstName: 'Jose Antonio', lastName: '', password: bcrypt.hashSync('HhnCR5RD', salt), userType: 'guest' },
{ id:93,firstName: 'Manolo', lastName: 'Gomez', password: bcrypt.hashSync('Fsd3Ru8Y', salt), userType: 'guest' },
{ id:94,firstName: 'Cristina', lastName: '', password: bcrypt.hashSync('Lh6ABN6A', salt), userType: 'guest' },
{ id:95,firstName: 'Cristina', lastName: '', password: bcrypt.hashSync('M9PYiXhM', salt), userType: 'guest' },
{ id:96,firstName: 'Hija Manolo', lastName: '', password: bcrypt.hashSync('i3iz5DPi', salt), userType: 'guest' },
{ id:97,firstName: 'Rosi', lastName: '', password: bcrypt.hashSync('3uB2w3Rj', salt), userType: 'guest' },
{ id:98,firstName: 'Daniela', lastName: '', password: bcrypt.hashSync('7sZsiBRE', salt), userType: 'guest' },
{ id:99,firstName: 'Irene', lastName: '', password: bcrypt.hashSync('tiNmmQwb', salt), userType: 'guest' },
{ id:100,firstName: 'Blanca', lastName: '', password: bcrypt.hashSync('EQM2LuXe', salt), userType: 'guest' },
{ id:101,firstName: 'Antoñito', lastName: '', password: bcrypt.hashSync('6G3bpkP8', salt), userType: 'guest' },
{ id:102,firstName: 'Pedro', lastName: '', password: bcrypt.hashSync('FNapEF4x', salt), userType: 'guest' },
{ id:103,firstName: 'Jesus', lastName: '', password: bcrypt.hashSync('ZXb6jp7a', salt), userType: 'guest' },
{ id:104,firstName: 'Blanca', lastName: '', password: bcrypt.hashSync('B3p63qDA', salt), userType: 'guest' },
{ id:105,firstName: 'Sara', lastName: '', password: bcrypt.hashSync('kfvgVGSA', salt), userType: 'guest' },
{ id:106,firstName: 'Francisco', lastName: 'Pitingo', password: bcrypt.hashSync('9zW2ZS4b', salt), userType: 'guest' },
{ id:107,firstName: 'Cintia', lastName: '', password: bcrypt.hashSync('mQGD2itN', salt), phone: '651442588', userType: 'guest' },
{ id:108,firstName: 'Francisco', lastName: '', password: bcrypt.hashSync('REZNNhYA', salt), userType: 'guest' },
{ id:109,firstName: 'Ana', lastName: 'Avila', password: bcrypt.hashSync('8f3Wkg9W', salt), phone: '610189801', userType: 'guest' },
{ id:110,firstName: 'Jose Manuel', lastName: '', password: bcrypt.hashSync('xpN57jwU', salt), userType: 'guest' },
{ id:111,firstName: 'Laura', lastName: 'Moreno', password: bcrypt.hashSync('WmgMskgW', salt), userType: 'guest' },
{ id:112,firstName: 'Amigo Paula', lastName: '', password: bcrypt.hashSync('XbztEyBZ', salt), userType: 'guest' },
{ id:113,firstName: 'Novia Amigo Paula', lastName: '', password: bcrypt.hashSync('hZMKBj4j', salt), userType: 'guest' },
{ id:114,firstName: 'Raul', lastName: 'Romero', password: bcrypt.hashSync('soPUjcx6e9', salt), phone: '657060381', userType: 'owner' },
{ id:115,firstName: 'Carmen', lastName: 'Gomez', password: bcrypt.hashSync('MN29jFzJaE', salt), phone: '651951923', userType: 'owner' },
 ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {})
     */
    const { sequelize } = queryInterface
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction }
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options)
        await sequelize.query('TRUNCATE TABLE Users', options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
