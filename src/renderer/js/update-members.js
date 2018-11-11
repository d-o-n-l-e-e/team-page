import fs from 'fs'

export default function (updatedTeam) {
  let data = (typeof (updatedTeam) === 'object') ? JSON.stringify(updatedTeam) : updatedTeam
  // replace existing data with filtered team
  fs.writeFileSync('static/myTeam.json', data, 'utf8', (err) => {
    if (err) {
      alert('Error', err)
    }
  })
}
