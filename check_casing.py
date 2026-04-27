import os
import re

def check_imports(root_dir):
    pattern = re.compile(r'''import.*?from\s+['"]([^'"]+)['"]''')
    for dirpath, _, filenames in os.walk(root_dir):
        if 'node_modules' in dirpath:
            continue
        for filename in filenames:
            if filename.endswith(('.js', '.jsx', '.ts', '.tsx')):
                filepath = os.path.join(dirpath, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                matches = pattern.findall(content)
                for match in matches:
                    if match.startswith('.'):
                        # Construct supposed path
                        target_path_base = os.path.normpath(os.path.join(dirpath, match))
                        
                        # We need to figure out if it exact matches
                        # Let's just list the directory of target_path and see if any file matches ignoring case but not exactly
                        dirname = os.path.dirname(target_path_base)
                        basename = os.path.basename(target_path_base)
                        
                        if not os.path.exists(dirname): continue
                        
                        actual_files = os.listdir(dirname)
                        
                        # It might not have an extension in the import
                        matched_any_exact = False
                        matched_any_insensitive = False
                        bad_match = ""
                        
                        for af in actual_files:
                            af_noext, _ = os.path.splitext(af)
                            if af == basename or af_noext == basename:
                                matched_any_exact = True
                            if af.lower() == basename.lower() or af_noext.lower() == basename.lower():
                                matched_any_insensitive = True
                                bad_match = af
                                
                        if matched_any_insensitive and not matched_any_exact:
                            print(f"CASE MISMATCH in {filepath}: imported '{match}' but file is '{bad_match}'")
                            
check_imports('frontend/src')
