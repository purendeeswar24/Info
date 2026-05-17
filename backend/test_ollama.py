"""
Test script to verify Ollama is running and responding correctly
"""

import requests
import json
import time

# Configuration
OLLAMA_URL = "http://localhost:11436"
API_ENDPOINT = f"{OLLAMA_URL}/api/generate"
MODEL = "mistral"

def check_ollama_status():
    """Check if Ollama service is running"""
    print("🔍 Checking Ollama status...")
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags", timeout=5)
        if response.status_code == 200:
            print("✅ Ollama service is RUNNING on port 11436")
            models = response.json().get("models", [])
            if models:
                print(f"📦 Available models: {len(models)}")
                for model in models:
                    print(f"   - {model.get('name', 'Unknown')}")
            return True
        else:
            print("❌ Ollama service is not responding properly")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Ollama service is NOT RUNNING on port 11436!")
        print("📝 Start Ollama with: $env:OLLAMA_HOST = '127.0.0.1:11436'; ollama serve")
        return False
    except Exception as e:
        print(f"❌ Error checking Ollama: {e}")
        return False

def test_ollama_response():
    """Test if Ollama can generate a response"""
    print("\n🧪 Testing Ollama response...")
    
    test_prompt = "What is artificial intelligence? Answer in 2 sentences."
    
    try:
        print(f"📤 Sending test prompt to {MODEL}...")
        print(f"   Prompt: '{test_prompt}'")
        
        start_time = time.time()
        
        response = requests.post(
            API_ENDPOINT,
            json={
                "model": MODEL,
                "prompt": test_prompt,
                "stream": False,
                "temperature": 0.7,
            },
            timeout=(10, 300)  # 10s connect, 300s read
        )
        
        elapsed_time = time.time() - start_time
        
        if response.status_code == 200:
            result = response.json()
            if result.get("response"):
                print(f"✅ Ollama responded successfully!")
                print(f"⏱️  Response time: {elapsed_time:.2f} seconds")
                print(f"\n📝 Response:\n{result['response']}")
                return True
            else:
                print("❌ Ollama returned empty response")
                return False
        else:
            print(f"❌ Ollama returned status code {response.status_code}")
            return False
            
    except requests.exceptions.Timeout:
        print(f"⏱️  Request timed out after {time.time() - start_time:.2f} seconds")
        print("   Ollama might be processing a large request or model is slow")
        return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to Ollama")
        return False
    except Exception as e:
        print(f"❌ Error testing Ollama: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_agent_context():
    """Test with actual portfolio context"""
    print("\n🎯 Testing with portfolio context...")
    
    test_prompt = """You are PREDAI, an AI assistant for Purendeeswar Reddy Mure's portfolio.

Purendeeswar's Background:
- AI/ML Engineer at D3V Technologies (Current)
- Technical Team Lead at Populus
- Expert in GCP, LangChain, RAG systems

User Question: What are Purendeeswar's technical skills?
Answer briefly."""
    
    try:
        print("📤 Sending portfolio context test...")
        
        start_time = time.time()
        
        response = requests.post(
            API_ENDPOINT,
            json={
                "model": MODEL,
                "prompt": test_prompt,
                "stream": False,
                "temperature": 0.7,
            },
            timeout=(10, 300)
        )
        
        elapsed_time = time.time() - start_time
        
        if response.status_code == 200:
            result = response.json()
            if result.get("response"):
                print(f"✅ Portfolio context test passed!")
                print(f"⏱️  Response time: {elapsed_time:.2f} seconds")
                print(f"\n📝 Response:\n{result['response']}")
                return True
            else:
                print("❌ Empty response")
                return False
        else:
            print(f"❌ Status code: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("🚀 OLLAMA VERIFICATION TEST SUITE")
    print("=" * 60)
    
    # Test 1: Check status
    status_ok = check_ollama_status()
    if not status_ok:
        print("\n⚠️  Ollama is not running. Cannot continue tests.")
        print("   Please start Ollama and try again.")
        return
    
    # Test 2: Simple response
    response_ok = test_ollama_response()
    
    # Test 3: Portfolio context
    context_ok = test_agent_context()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    print(f"✅ Ollama Status: {'PASS' if status_ok else 'FAIL'}")
    print(f"✅ Response Test: {'PASS' if response_ok else 'FAIL'}")
    print(f"✅ Context Test: {'PASS' if context_ok else 'FAIL'}")
    
    if status_ok and response_ok:
        print("\n🎉 Ollama is working correctly!")
    else:
        print("\n❌ There are issues with Ollama setup")

if __name__ == "__main__":
    main()
