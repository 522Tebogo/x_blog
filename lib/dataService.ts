import { promises as fs } from 'fs';
import path from 'path';
import { Category, Tool } from './types';

const dataDir = path.join(process.cwd(), 'data');
const categoriesFile = path.join(dataDir, 'categories.json');
const toolsFile = path.join(dataDir, 'tools.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// Categories
export async function getCategories(): Promise<Category[]> {
    try {
        await ensureDataDir();
        const data = await fs.readFile(categoriesFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function getCategoryById(id: string): Promise<Category | null> {
    const categories = await getCategories();
    return categories.find(c => c.id === id) || null;
}

export async function addCategory(category: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
    await ensureDataDir();
    const categories = await getCategories();
    const newCategory: Category = {
        ...category,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    };
    categories.push(newCategory);
    await fs.writeFile(categoriesFile, JSON.stringify(categories, null, 2));
    return newCategory;
}

export async function deleteCategory(id: string): Promise<void> {
    const categories = await getCategories();
    const filtered = categories.filter(c => c.id !== id);
    await fs.writeFile(categoriesFile, JSON.stringify(filtered, null, 2));
}

// Tools
export async function getTools(): Promise<Tool[]> {
    try {
        await ensureDataDir();
        const data = await fs.readFile(toolsFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function getToolById(id: string): Promise<Tool | null> {
    const tools = await getTools();
    return tools.find(t => t.id === id) || null;
}

export async function addTool(tool: Omit<Tool, 'id' | 'createdAt'>): Promise<Tool> {
    await ensureDataDir();
    const tools = await getTools();
    const newTool: Tool = {
        ...tool,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    };
    tools.push(newTool);
    await fs.writeFile(toolsFile, JSON.stringify(tools, null, 2));
    return newTool;
}

export async function deleteTool(id: string): Promise<void> {
    const tools = await getTools();
    const filtered = tools.filter(t => t.id !== id);
    await fs.writeFile(toolsFile, JSON.stringify(filtered, null, 2));
}
