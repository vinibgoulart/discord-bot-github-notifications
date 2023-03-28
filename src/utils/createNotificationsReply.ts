import {GitHubNotification} from "../types/github-notification";

export const createNotificationsReply = (notifications: GitHubNotification[]): string => {
  let reply = "**Here are your notifications:** \n\n"

  notifications.forEach((notification: GitHubNotification) => {
    const title = `- **Title:** [${notification.subject.title}](${notification.subject.url}) \n`
    const updatedAt = `- **Updated At:** ${notification.updated_at} \n`
    const reason = `- **Reason:** ${notification.reason} \n`
    const subjectType = `- **Subject Type:** ${notification.subject.type} \n`
    const repository = `- **Repository:** [${notification.repository.full_name}](${notification.repository.html_url}) \n`

    reply += title + updatedAt + reason + subjectType + repository
  })

  return reply
}