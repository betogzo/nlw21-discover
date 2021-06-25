const Database = require('../db/config');


module.exports = {
    async create(req, res) {
        const db = await Database();
        const pass = req.body.password; //capturando a senha do input password
        let roomId;
        let isRoom = true;

        while (isRoom) {
            //gerando o numero da sala
            for(let i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : 
                roomId += Math.floor(Math.random() * 10).toString();
            }

            //verificar se numero da sala ja existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`);
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId);

            //inserindo sala e senha no banco de dados se o id da sala for único
            if(!isRoom) {
                await db.run(`INSERT INTO rooms (
                        id, 
                        pass
                    ) VALUES (
                        ${parseInt(roomId)},
                        '${pass}'
                )`);
            }

        } 
        
        await db.close();
        res.redirect(`/room/${roomId}`);
    },

    async open(req, res) {
        const db = await Database();
        const roomId = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`);
        let isNoQuestions;

        if (questions.length == 0 && questionsRead.length == 0) isNoQuestions = true;
        
        
        res.render('room', {roomId: roomId, 
            questions: questions.reverse(), 
            questionsRead: questionsRead.reverse(), 
            isNoQuestions: isNoQuestions});
    },

    enter(req, res) {
        const roomId = req.body.roomId;
        res.redirect(`/room/${roomId}`);
    }
}