export interface AdminSessionUser {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

type ApiResponse =
  | { ok: true; admin: AdminSessionUser }
  | { ok: false; error: string };

async function requestJson(path: string, init?: RequestInit): Promise<ApiResponse> {
  const response = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    },
    ...init
  });

  return response.json();
}

export const adminSessionService = {
  async me(): Promise<AdminSessionUser | null> {
    try {
      const data = await requestJson('/api/admin/me.php', { method: 'GET' });
      return data.ok ? data.admin : null;
    } catch {
      return null;
    }
  },

  async login(username: string, password: string): Promise<AdminSessionUser> {
    const data = await requestJson('/api/admin/login.php', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    if (!data.ok) {
      throw new Error(data.error || 'login_failed');
    }

    return data.admin;
  },

  async logout(): Promise<void> {
    await requestJson('/api/admin/logout.php', { method: 'POST' });
  }
};
