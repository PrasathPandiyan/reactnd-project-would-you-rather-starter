
export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, user, id) {
    const { name, avatarURL } = user;
    const {optionOne, optionTwo, timestamp } = question;

    return {
        name,
        id,
        timestamp,
        text1: optionOne.text,
        text2: optionTwo.text,
        avatar: avatarURL,
    }
}

export function getQuestionInfo(users, question, authedUser) {

    const author = question.author;
    const name = users[author].name;
    const avatarUrl = users[author].avatarURL;

    return {
        ...question,
        name,
        avatarUrl,
    }
}
