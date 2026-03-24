import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'waitlist-data.json')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, company, role, source } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const entry = {
      email,
      company: company || '',
      role: role || '',
      source: source || 'unknown',
      timestamp: new Date().toISOString(),
    }

    let data: unknown[] = []
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8')
      data = JSON.parse(raw)
    } catch {
      // File doesn't exist yet
    }

    data.push(entry)
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
