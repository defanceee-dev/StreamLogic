Внутрянка StreamLogic

Что внутри:
- dashboard.html
- leads.html
- profile.html
- integrations.html
- billing.html
- settings.html
- app.css
- app.js
- landing_redirect_patch.txt

Как подключить:
1. Положи эти файлы рядом с index.html на фронтенде.
2. Внеси правку из landing_redirect_patch.txt в свой index_updated.html.
3. После логина пользователь будет попадать в dashboard.html.
4. Пока данные лидов и профиля хранятся в localStorage браузера.

Что уже работает:
- sidebar + layout
- route guard по streamlogic_token
- logout
- dashboard
- leads с фильтрами и добавлением вручную
- profile с локальным сохранением
- integrations / billing / settings как готовый UI-каркас

Что потом добить:
- backend endpoints для leads/profile/settings
- реальные twitch-данные
- роли / подписки / платежи
