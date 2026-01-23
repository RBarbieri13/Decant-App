export interface CreateNodeInput {
    title: string;
    url: string;
    source_domain: string;
    company?: string;
    phrase_description?: string;
    short_description?: string;
    logo_url?: string;
    ai_summary?: string;
    extracted_fields?: Record<string, any>;
    metadata_tags?: string[];
    key_concepts?: string[];
    function_parent_id?: string | null;
    organization_parent_id?: string | null;
}
export interface UpdateNodeInput {
    title?: string;
    company?: string;
    phrase_description?: string;
    short_description?: string;
    logo_url?: string;
    ai_summary?: string;
    extracted_fields?: Record<string, any>;
    metadata_tags?: string[];
    key_concepts?: string[];
    function_parent_id?: string | null;
    organization_parent_id?: string | null;
}
export declare function createNode(data: CreateNodeInput): any;
export declare function readNode(id: string): any;
export declare function updateNode(id: string, data: UpdateNodeInput): any;
export declare function deleteNode(id: string): void;
export declare function getAllNodes(): any[];
export declare function getNodeById(id: string): any;
